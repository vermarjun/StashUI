#!/usr/bin/env node
// Does setup work on this machine, in every shell an agent might use here?
//
// It does what a user's agent does, literally: reads setup.md from a running
// site, runs the commands it gives for this platform, then runs the command the
// installed skill tells agents to use, in each shell found (sh, bash, zsh on
// macOS and Linux; PowerShell, pwsh, cmd and Git Bash on Windows).
//
//   node agent/test/setup.e2e.mjs            start a throwaway copy of the site and test against it
//   node agent/test/setup.e2e.mjs <url>      test against a site that is already running
//
// The throwaway site needs only Node and network access to install `sharp`.
// Everything is written under a temp folder; the real home folder is not touched.
import { spawn, spawnSync } from "node:child_process";
import { cpSync, existsSync, mkdirSync, mkdtempSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const REPO = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const WIN = process.platform === "win32";
const work = mkdtempSync(join(tmpdir(), "stashui-e2e-"));
const home = join(work, "home"), project = join(work, "project");
mkdirSync(home); mkdirSync(join(project, "src"), { recursive: true });
writeFileSync(join(project, "src", "page.tsx"), 'export default function P() { return <main className="min-h-dvh bg-background">hi</main>; }\n');
// every way a shell or node might look up the home folder points at the sandbox
const env = { ...process.env, HOME: home, USERPROFILE: home, HOMEDRIVE: home.slice(0, 2), HOMEPATH: home.slice(2), STASHUI_URL: "" };
delete env.STASHUI_URL;

const sh = (cmd, args, o = {}) => spawnSync(cmd, args, { encoding: "utf8", env, cwd: project, ...o });
const has = (cmd, args = ["--version"]) => { const r = spawnSync(cmd, args, { stdio: "ignore" }); return !r.error && r.status === 0; };

// ── a site to test against ──────────────────────────────────────────────────
let site = process.argv[2], server = null;
if (!site) {
  const port = 4300 + Math.floor(Math.random() * 500);
  site = `http://127.0.0.1:${port}`;
  const pub = join(work, "site", "public");
  mkdirSync(join(pub, "agent"), { recursive: true });
  cpSync(join(REPO, "agent", "core"), join(work, "site", "agent", "core"), { recursive: true });
  cpSync(join(REPO, "agent", "dev-server.mjs"), join(work, "site", "agent", "dev-server.mjs"));
  for (const d of ["agent/tiles", "agent/film", "r"]) cpSync(join(REPO, "public", d), join(pub, d), { recursive: true });
  console.log("installing sharp for the throwaway site…");
  const npm = spawnSync("npm", ["install", "--prefix", join(work, "site"), "--no-audit", "--no-fund", "--loglevel=error", "sharp"], { stdio: "inherit", shell: WIN });
  if (npm.status !== 0) { console.error("could not install sharp"); process.exit(2); }
  const build = spawnSync(process.execPath, [join(REPO, "agent", "pipeline", "build.mjs")], { encoding: "utf8", env: { ...process.env, STASHUI_SITE: site, STASHUI_OUT: pub } });
  if (build.status !== 0) { console.error(build.stderr); process.exit(2); }
  server = spawn(process.execPath, [join(work, "site", "agent", "dev-server.mjs"), String(port)], { env: { ...process.env, STASHUI_PUBLIC: pub, STASHUI_NO_EMBED: "1" }, stdio: "ignore" });
  for (let i = 0; i < 100; i++) { try { if ((await fetch(`${site}/setup.md`)).ok) break; } catch { /* not up yet */ } await new Promise((r) => setTimeout(r, 200)); }
}

// ── the shells an agent could be running in on this machine ─────────────────
const gitBash = ["C:\\Program Files\\Git\\bin\\bash.exe", "C:\\Program Files (x86)\\Git\\bin\\bash.exe"].find(existsSync);
const shells = (WIN ? [
  ["powershell", "powershell.exe", (c) => ["-NoProfile", "-NonInteractive", "-Command", c], has("powershell.exe", ["-NoProfile", "-Command", "exit 0"])],
  ["pwsh", "pwsh", (c) => ["-NoProfile", "-NonInteractive", "-Command", c], has("pwsh", ["-NoProfile", "-Command", "exit 0"])],
  ["cmd", "cmd.exe", (c) => ["/d", "/s", "/c", `"${c}"`], true],   // the same quoting Node itself uses for shell: true
  ["git-bash", gitBash, (c) => ["-c", c], !!gitBash],
] : [
  ["sh", "sh", (c) => ["-c", c], true],
  ["bash", "bash", (c) => ["-c", c], has("bash")],
  ["zsh", "zsh", (c) => ["-c", c], has("zsh")],
]).filter((s) => s[3]);
const inShell = ([, exe, argv], line) => sh(exe, argv(line), WIN && exe === "cmd.exe" ? { windowsVerbatimArguments: true } : {});

const results = [];
const check = (shell, what, ok, detail = "") => { results.push({ shell, what, ok }); console.log(`${ok ? "ok  " : "FAIL"}  ${shell.padEnd(10)} ${what}${ok ? "" : `\n        ${String(detail).trim().split("\n").slice(-4).join("\n        ")}`}`); };

// ── 1. the setup page's own commands, run as written, in every shell here ────
const setup = await (await fetch(`${site}/setup.md`)).text();
const block = (lang) => setup.match(new RegExp("```" + lang + "\\n([\\s\\S]*?)```"))?.[1].trim();
const setupShell = shells[0];
const oneLine = block("sh");                                  // the one command that is meant to work everywhere
for (const shell of shells) {
  const ran = inShell(shell, oneLine);
  check(shell[0], "setup.md's one command installs StashUI", ran.status === 0 && /StashUI is installed/.test(ran.stdout), ran.stderr || ran.stdout);
}
check(setupShell[0], "writes only .stashui, .claude and .agents in the home folder",
  JSON.stringify(readdirSync(home).sort()) === JSON.stringify([".agents", ".claude", ".stashui"]) && JSON.stringify(readdirSync(join(home, ".stashui"))) === '["stashui.mjs"]', readdirSync(home));
check(setupShell[0], "nothing written into the project", readdirSync(project).join() === "src", readdirSync(project));
// the step-by-step alternative for this platform's native shell
const steps = WIN ? [shells.find((s) => s[0] === "powershell" || s[0] === "pwsh"), block("powershell"), "; "] : [shells.find((s) => s[0] === "bash") || shells[0], block("bash"), " && "];
if (steps[0] && (WIN || has("curl"))) {                     // the bash steps need curl; the one command above does not
  const ran = inShell(steps[0], steps[1].split("\n").join(steps[2]));
  check(steps[0][0], "setup.md's step-by-step commands also work", ran.status === 0 && /StashUI is installed/.test(ran.stdout), ran.stderr || ran.stdout);
}

// ── 2. the command the installed skill gives agents, in every shell here ─────
const skillFile = join(home, ".claude", "skills", "stashui", "SKILL.md");
const skill = existsSync(skillFile) ? readFileSync(skillFile, "utf8") : "";
const cli = skill.match(/`(node [^`]+?) context`/)?.[1];
check(setupShell[0], `skill names a runnable command: ${cli}`, !!cli && !skill.includes("{{CLI}}"), skill.slice(0, 300));
check(setupShell[0], "both skill folders hold the three skills", [".claude", ".agents"].every((d) => existsSync(join(home, d, "skills")) && readdirSync(join(home, d, "skills")).sort().join() === "stashui,stashui-explore,stashui-review"));

for (const shell of cli ? shells : []) {
  const run = (rest) => inShell(shell, `${cli} ${rest}`);
  const browse = run("browse");
  check(shell[0], "browse answers", browse.status === 0 && /components\. Kinds, with counts/.test(browse.stdout), browse.stderr || browse.stdout);
  const search = run('search "primary call to action" --kind button --no-context');
  const image = search.stdout.match(/^IMAGE: (.+)$/m)?.[1].trim();
  check(shell[0], "search saves an image where it says", search.status === 0 && !!image && existsSync(image) && readFileSync(image).subarray(0, 2).toString("hex") === "ffd8", search.stderr || search.stdout);
  const first = search.stdout.match(/^\s*1\s{2}(\S+)/m)?.[1];
  const view = run(`view ${first}`);
  check(shell[0], "view returns six frames", view.status === 0 && /Frames 1-6 are/.test(view.stdout) && /^IMAGE: /m.test(view.stdout), view.stderr || view.stdout);
  const context = run("context");
  check(shell[0], "context reads the project", context.status === 0 && /^Project: /m.test(context.stdout), context.stderr || context.stdout);
  const review = run("review src --json");
  check(shell[0], "review returns counts", review.status === 0 && JSON.parse(review.stdout || "{}").pass === true, review.stderr || review.stdout);
  const add = run(`add ${first} --print`);
  check(shell[0], "add prints one install command", add.status === 0 && /^npx shadcn@latest add /.test(add.stdout), add.stderr || add.stdout);
  const update = run("update");
  check(shell[0], "update finds itself current", update.status === 0 && /up to date/.test(update.stdout), update.stderr || update.stdout);
}

server?.kill();
const failed = results.filter((r) => !r.ok);
console.log(`\n${process.platform} ${process.arch} · node ${process.version} · shells: ${shells.map((s) => s[0]).join(", ")} · ${results.length - failed.length} of ${results.length} checks pass`);
process.exit(failed.length ? 1 : 0);
