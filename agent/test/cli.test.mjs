// The CLI the way an agent uses it: a real process, a real server, a scratch project.
import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { existsSync, mkdirSync, mkdtempSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { after, before, test } from "node:test";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
process.env.STASHUI_PUBLIC = join(ROOT, "public");
const { start } = await import("../dev-server.mjs");
const CLI = join(ROOT, "public/agent/stashui.mjs");           // the published file, not the source
const PORT = 4399, URL_ = `http://127.0.0.1:${PORT}`;
let server;
before(async () => { server = await start(PORT); });
after(() => { server.closeAllConnections(); server.close(); });

const scratch = () => mkdtempSync(join(tmpdir(), "stashui-"));
// async on purpose: the server lives in this process, so a blocking spawn would starve it
const spawnCli = (file, cwd, args, env = {}) => new Promise((done) => {
  const child = spawn("node", [file, ...args], { cwd, env: { ...process.env, STASHUI_URL: URL_, ...env } });
  let stdout = "", stderr = "";
  child.stdout.on("data", (d) => (stdout += d)); child.stderr.on("data", (d) => (stderr += d));
  child.on("close", (status) => done({ status, stdout, stderr }));
});
const run = (cwd, args, env) => spawnCli(CLI, cwd, args, env);

test("search prints a legend and saves the image it names", async () => {
  const dir = scratch();
  const out = await run(dir, ["search", "primary", "call", "to", "action", "--kind", "button"]);
  assert.equal(out.status, 0, out.stderr);
  const file = out.stdout.match(/^IMAGE: (.+)$/m)[1];
  assert.ok(existsSync(file) && file.includes(join(".stashui", "sheets")));
  assert.equal(readFileSync(file).subarray(0, 2).toString("hex"), "ffd8");
  assert.equal(readFileSync(join(dirname(dirname(file)), ".gitignore"), "utf8"), "*\n");
  assert.match(out.stdout, /^ 1  \S+/m);
});

test("context reads theme and accent from the project's tokens, in oklch and in hsl channels", async () => {
  const a = scratch(); mkdirSync(join(a, "src/app"), { recursive: true });
  writeFileSync(join(a, "package.json"), JSON.stringify({ name: "demo", dependencies: { next: "15.5.0", tailwindcss: "4.1.0" } }));
  writeFileSync(join(a, "src/app/globals.css"), ":root {\n  --background: oklch(0.14 0.005 285);\n  --foreground: oklch(0.98 0 0);\n  --primary: oklch(0.70 0.19 48);\n}\n");
  assert.match((await run(a, ["context"])).stdout, /Read as: dark theme, orange accent/);
  const b = scratch(); mkdirSync(join(b, "app"), { recursive: true });
  writeFileSync(join(b, "app/globals.css"), ":root {\n  --background: 0 0% 100%;\n  --primary: 221 83% 53%;\n}\n");
  assert.match((await run(b, ["context"])).stdout, /Read as: light theme, blue accent/);
  mkdirSync(join(b, "components/ui"), { recursive: true }); writeFileSync(join(b, "components/ui/button.tsx"), "");
  assert.match((await run(b, ["context"])).stdout, /Already installed \(1\).*button/);
});

test("review returns counts, fails on the bad fixture and passes the good one", async () => {
  const bad = await run(ROOT, ["review", "agent/test/fixtures/bad", "--json"]);
  const r = JSON.parse(bad.stdout), by = Object.fromEntries(r.checks.map((c) => [c.name, c.count]));
  assert.equal(bad.status, 1);
  assert.equal(r.pass, false);
  assert.ok(by["off-token colours"] >= 6);
  for (const k of ["transition: all", "focus outline removed", "image without alt", "click handler on a div", "h-screen", "animates with no reduced-motion guard"]) assert.equal(by[k], 1, k);
  assert.ok(by["accent hue families"] >= 3 && by.gradients >= 1);
  const good = await run(ROOT, ["review", "agent/test/fixtures/good", "--json"]);
  assert.equal(good.status, 0);
  assert.equal(JSON.parse(good.stdout).pass, true);
  assert.ok(JSON.parse(good.stdout).checks.some((c) => c.name === "animates with no reduced-motion guard" && c.count === 0), "every check is reported, also at zero");
});

test("init installs checksum-verified skills for every agent family and points them at the CLI", async () => {
  const home = scratch(), proj = scratch();
  const out = await run(proj, ["init"], { HOME: home, USERPROFILE: home, PATH: process.env.PATH });
  assert.equal(out.status, 0, out.stderr);
  for (const root of [".claude/skills", ".agents/skills"]) {
    const skill = readFileSync(join(home, root, "stashui/SKILL.md"), "utf8");
    assert.ok(!skill.includes("{{CLI}}") && skill.includes("node ~/.stashui/stashui.mjs context"));
    assert.deepEqual(readdirSync(join(home, root)).sort(), ["stashui", "stashui-explore", "stashui-review"]);
    assert.ok(existsSync(join(home, root, "stashui/references/design-doc.md")));
  }
  assert.deepEqual(readdirSync(join(home, ".stashui")), ["stashui.mjs"], "init writes one file under ~/.stashui and never touches PATH");
  assert.deepEqual(readdirSync(home).sort(), [".agents", ".claude", ".stashui"], "init writes nowhere else in the home folder");
  assert.match(out.stdout, /StashUI is installed/);
  assert.ok(!existsSync(join(proj, ".claude")), "a default install must not write into the project");
});

test("propose turns a plan into a link that carries the whole plan", async () => {
  const dir = scratch();
  const plan = { title: "T", slots: [{ slot: "Header", pick: "comp-578", why: "x", alternatives: ["comp-581"] }] };
  writeFileSync(join(dir, "plan.json"), JSON.stringify(plan));
  const out = await run(dir, ["propose", "plan.json", "--no-open"]);
  const hash = out.stdout.match(/proposal\.html#(\S+)/)[1];
  assert.deepEqual(JSON.parse(Buffer.from(hash, "base64url").toString()), plan);
  writeFileSync(join(dir, "bad.json"), JSON.stringify({ slots: [{ slot: "x" }] }));
  assert.equal((await run(dir, ["propose", "bad.json", "--no-open"])).status, 1);
});

test("a wrong name or command says what to do next", async () => {
  const dir = scratch();
  assert.match((await run(dir, ["view", "comp-578x"])).stdout, /Closest: /);
  assert.match((await run(dir, ["frobnicate"])).stderr, /Unknown command/);
  assert.match((await run(dir, ["search", "x"], { STASHUI_URL: "http://127.0.0.1:9" })).stderr, /Cannot reach/);
});

test("an installed copy learns that a newer one is published, and update replaces it", async () => {
  const home = scratch(), proj = scratch();
  mkdirSync(join(home, ".stashui"));
  const old = join(home, ".stashui", "stashui.mjs");
  writeFileSync(old, readFileSync(CLI, "utf8") + "\n// an older build\n");
  const stale = spawnCli(old, proj, ["context"], { HOME: home, USERPROFILE: home });
  assert.match((await stale).stdout, /A newer StashUI CLI and skills are published/);
  const up = await spawnCli(old, proj, ["update"], { HOME: home, USERPROFILE: home });
  assert.equal(up.status, 0, up.stderr);
  assert.equal(readFileSync(old, "utf8"), readFileSync(CLI, "utf8"), "the installed file is now the published one");
  assert.ok(existsSync(join(home, ".claude/skills/stashui/SKILL.md")), "and the skills were reinstalled");
  assert.ok(!/A newer StashUI/.test((await spawnCli(old, proj, ["context"], { HOME: home, USERPROFILE: home })).stdout));
  assert.match((await spawnCli(old, proj, ["update"], { HOME: home, USERPROFILE: home })).stdout, /up to date/);
});
