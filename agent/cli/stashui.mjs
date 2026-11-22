#!/usr/bin/env node
// StashUI for agents. One file, no dependencies, Node 18+.
//
// The catalogue lives on the server. This file is the door for anything with a
// shell: it asks the server, saves the image the server composed, and prints
// the legend with the path of the image so the agent can open it.
import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import { chmodSync, copyFileSync, existsSync, mkdirSync, readFileSync, readdirSync, statSync, symlinkSync, writeFileSync } from "node:fs";
import { homedir } from "node:os";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const SITE = (process.env.STASHUI_URL || "{{SITE}}").replace(/\/$/, "");
const API = `${SITE}/api/agent/v1`;
const HOME = join(homedir(), ".stashui");
const SELF = fileURLToPath(import.meta.url);

const HELP = `stashui: find, see and install UI components

  stashui browse [kind…]            what exists; with up to 4 kinds, one image of the best five of each
  stashui search <what it must do>  one image of numbered matches, plus a line per number
      --kind K  --page N  --dense  --clean  --like NAME  --theme dark|light  --accent HUE  --no-context
  stashui view <name>               six frames of one component in motion, with props and cost
  stashui board <name…>             your picks together in one image   --labels header,hero,…
  stashui code <name>               source, for a component you are about to modify
  stashui add <name…>               install into this project (shadcn)   --print to only show the command
  stashui context                   what this project already has: stack, tokens, installed components
  stashui propose <plan.json>       the page a human approves: picks, runners-up, reasons
  stashui review [path…]            deterministic UI checks with counts   --json
  stashui init [--project] [--mcp]  install the skills (and optionally the MCP server) for your agent

Images are saved under .stashui/sheets/ and their path is printed. Open that file to see the components.`;

// ── arguments ───────────────────────────────────────────────────────────────
const [cmd, ...rest] = process.argv.slice(2);
const flags = {}, words = [];
for (let i = 0; i < rest.length; i++) {
  const a = rest[i];
  if (!a.startsWith("--")) { words.push(a); continue; }
  const [k, v] = a.slice(2).split("=");
  const takesValue = ["kind", "page", "like", "theme", "accent", "labels", "out"].includes(k);
  flags[k] = v ?? (takesValue ? rest[++i] : true);
}
const die = (msg) => { console.error(msg); process.exit(1); };

// ── talking to the server ───────────────────────────────────────────────────
async function get(op, params = {}) {
  const qs = new URLSearchParams(Object.entries(params).filter(([, v]) => v != null && v !== false && v !== "").map(([k, v]) => [k, String(v)]));
  let res;
  try { res = await fetch(`${API}/${op}?${qs}`); }
  catch (e) { die(`Cannot reach ${SITE} (${e.cause?.code || e.message}). Check the network, or set STASHUI_URL.`); }
  const body = await res.json().catch(() => ({ error: `${res.status} ${res.statusText}` }));
  if (!res.ok && !body.text) die(body.error || `StashUI returned ${res.status}`);
  return body;
}

async function show(op, params, label) {
  const out = await get(op, params);
  console.log(out.text);
  if (out.sheet) {
    const dir = join(process.cwd(), ".stashui", "sheets");
    mkdirSync(dir, { recursive: true });
    const ignore = join(process.cwd(), ".stashui", ".gitignore");
    if (!existsSync(ignore)) writeFileSync(ignore, "*\n");            // the folder ignores itself; the project's .gitignore is untouched
    const file = join(dir, `${label}-${createHash("sha1").update(out.sheet).digest("hex").slice(0, 8)}.jpg`);
    const img = await fetch(out.sheet);
    if (!img.ok) die(`Could not fetch the image (${img.status}). Link: ${out.sheet}`);
    writeFileSync(file, Buffer.from(await img.arrayBuffer()));
    console.log(`\nIMAGE: ${file}\nOpen that file now. The numbers in it match the lines above.`);
  }
  return out;
}

// ── reading the project ─────────────────────────────────────────────────────
const read = (p) => { try { return readFileSync(p, "utf8"); } catch { return ""; } };
const HSL_HUES = [["red", 345, 15], ["orange", 15, 45], ["yellow", 45, 70], ["green", 70, 165], ["teal", 165, 195], ["blue", 195, 255], ["purple", 255, 290], ["pink", 290, 345]];
const OKLCH_HUES = [["red", 10, 45], ["orange", 45, 80], ["yellow", 80, 115], ["green", 115, 165], ["teal", 165, 215], ["blue", 215, 275], ["purple", 275, 325], ["pink", 325, 10]];
const bucket = (h, table) => table.find(([, lo, hi]) => (lo < hi ? h >= lo && h < hi : h >= lo || h < hi))?.[0] ?? null;

/** A CSS colour -> { light: 0..1, hue: name|null }. Understands hex, rgb(), hsl(), bare "h s% l%", and oklch(). */
function colour(value) {
  const v = value.trim().toLowerCase();
  const nums = (v.match(/-?\d*\.?\d+%?/g) || []).map((n) => (n.endsWith("%") ? parseFloat(n) / 100 : parseFloat(n)));
  if (v.startsWith("oklch")) return { light: nums[0] > 1 ? nums[0] / 100 : nums[0], hue: nums[1] < 0.04 ? null : bucket(((nums[2] % 360) + 360) % 360, OKLCH_HUES) };
  let r, g, b;
  if (v.startsWith("#")) {
    const h = v.slice(1), full = h.length <= 4 ? [...h].map((c) => c + c).join("") : h;
    [r, g, b] = [0, 2, 4].map((i) => parseInt(full.slice(i, i + 2), 16) / 255);
  } else if (v.startsWith("rgb")) [r, g, b] = nums.map((n) => n / 255);
  else if (nums.length >= 3) return { light: nums[2], hue: nums[1] < 0.12 ? null : bucket(nums[0], HSL_HUES) };   // hsl() or shadcn's bare channels
  else return null;
  const mx = Math.max(r, g, b), mn = Math.min(r, g, b), d = mx - mn, light = (mx + mn) / 2;
  if (d < 0.08) return { light, hue: null };
  const h = 60 * (mx === r ? ((g - b) / d) % 6 : mx === g ? (b - r) / d + 2 : (r - g) / d + 4);
  return { light, hue: bucket((h + 360) % 360, HSL_HUES) };
}

function project() {
  const cwd = process.cwd();
  const pkg = JSON.parse(read(join(cwd, "package.json")) || "{}");
  const deps = { ...pkg.dependencies, ...pkg.devDependencies };
  const cssFile = ["app/globals.css", "src/app/globals.css", "src/index.css", "src/styles/globals.css", "styles/globals.css", "src/app.css", "app/app.css"]
    .map((f) => join(cwd, f)).find(existsSync);
  const css = cssFile ? read(cssFile) : "";
  const block = (sel) => css.match(new RegExp(`${sel}\\s*\\{([^}]*)\\}`))?.[1] || "";
  const vars = (text) => Object.fromEntries([...text.matchAll(/--([\w-]+)\s*:\s*([^;]+);/g)].map((m) => [m[1], m[2].trim()]));
  const light = vars(block(":root")), dark = vars(block("\\.dark"));
  const layout = ["app/layout.tsx", "src/app/layout.tsx", "index.html", "src/main.tsx"].map((f) => read(join(cwd, f))).join("\n");
  const forcedDark = /class(Name)?="[^"]*\bdark\b|defaultTheme="dark"/.test(layout);
  const bg = light.background && colour(light.background);
  const theme = forcedDark ? "dark" : bg ? (bg.light < 0.45 ? "dark" : "light") : null;
  const tokens = theme === "dark" && Object.keys(dark).length ? { ...light, ...dark } : light;
  const accent = ["primary", "accent", "ring", "chart-1", "brand"].map((k) => tokens[k] && colour(tokens[k])?.hue).find(Boolean) || null;
  const components = join(cwd, existsSync(join(cwd, "src/components/ui")) ? "src/components/ui" : "components/ui");
  const installed = existsSync(components) ? readdirSync(components).filter((f) => /\.(t|j)sx?$/.test(f)).map((f) => f.replace(/\.\w+$/, "")) : [];
  return { cwd, pkg, deps, cssFile, tokens, theme, accent, installed, components, design: existsSync(join(cwd, "DESIGN.md")), shadcn: existsSync(join(cwd, "components.json")) };
}

// ── commands ────────────────────────────────────────────────────────────────
const commands = {
  async browse() { await show("browse", { kinds: words.join(","), ...ctx() }, "browse"); },

  async search() {
    if (!words.length) die("search needs words: what the piece must do.");
    await show("search", { query: words.join(" "), kind: flags.kind, page: flags.page, dense: flags.dense, clean: flags.clean, like: flags.like, ...ctx() }, "search");
  },

  async view() { if (!words[0]) die("view needs a component name."); await show("view", { name: words[0] }, `view-${words[0]}`); },

  async board() { if (words.length < 2) die("board needs two or more names."); await show("board", { names: words.join(","), labels: flags.labels }, "board"); },

  async code() { if (!words[0]) die("code needs a component name."); console.log((await get("code", { name: words[0] })).text); },

  async add() {
    if (!words.length) die("add needs component names.");
    const out = await get("add", { names: words.join(",") });
    console.log(out.text);
    if (flags.print || !out.data) return;
    if (!existsSync(join(process.cwd(), "components.json"))) die("\nThis project has no components.json. Run `npx shadcn@latest init -d` first, then repeat this command.");
    const [bin, ...args] = out.data.command;
    process.exit(spawnSync(bin, [...args, "--yes"], { stdio: "inherit", shell: process.platform === "win32" }).status ?? 1);
  },

  async context() {
    const p = project();
    const t = (k) => (p.tokens[k] ? `${k} ${p.tokens[k]}` : null);
    console.log([
      `Project: ${p.pkg.name || "(no package.json)"} · ${p.deps.next ? `Next ${p.deps.next}` : p.deps.vite ? "Vite" : p.deps.react ? "React" : "unknown stack"}` +
        `${p.deps.tailwindcss ? ` · Tailwind ${p.deps.tailwindcss}` : " · no Tailwind"} · ${p.shadcn ? "shadcn ready" : "no components.json (run `npx shadcn@latest init -d` before add)"}`,
      `Design doc: ${p.design ? "DESIGN.md exists. Read it; it outranks your taste." : "none. Write DESIGN.md before choosing components."}`,
      `Tokens (${p.cssFile ? relative(p.cwd, p.cssFile) : "no global css found"}): ${["background", "foreground", "primary", "accent", "radius"].map(t).filter(Boolean).join(" · ") || "none defined"}`,
      `Read as: ${p.theme || "unknown"} theme, ${p.accent || "no"} accent hue. Searches rank against this unless you pass --theme/--accent or --no-context.`,
      p.installed.length
        ? `Already installed (${p.installed.length}), reuse before adding a twin: ${p.installed.join(", ")}`
        : "No components installed yet.",
    ].join("\n"));
  },

  async propose() {
    if (!words[0]) die("propose needs a plan file. See the stashui skill for its shape.");
    let plan;
    try { plan = JSON.parse(readFileSync(resolve(words[0]), "utf8")); } catch (e) { die(`Cannot read ${words[0]}: ${e.message}`); }
    const directions = plan.directions || [plan];
    for (const d of directions) if (!Array.isArray(d.slots) || !d.slots.every((s) => s.slot && s.pick)) die("Each direction needs `slots`, and each slot needs `slot` and `pick`.");
    const url = `${SITE}/agent/proposal.html#${Buffer.from(JSON.stringify(plan)).toString("base64url")}`;
    console.log(`Proposal for the user (${directions.length > 1 ? `${directions.length} directions` : `${directions[0].slots.length} sections`}):\n${url}\n\nGive the user that link and stop. Build nothing until they answer.`);
    if (!flags["no-open"]) spawnSync(process.platform === "darwin" ? "open" : process.platform === "win32" ? "start" : "xdg-open", [url], { stdio: "ignore", shell: process.platform === "win32" });
  },

  async review() { review(words.length ? words : ["src", "app", "components"].filter((d) => existsSync(d))); },

  async init() { await init(); },
};

/** Rank against the project's own look unless told otherwise. */
function ctx() {
  if (flags["no-context"]) return {};
  const p = flags.theme && flags.accent ? {} : project();
  return { theme: flags.theme || p.theme || undefined, accent: flags.accent || p.accent || undefined };
}

// ── review: numbers an agent can drive to zero ──────────────────────────────
function review(paths) {
  const PALETTE = "slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose";
  const UTIL = "bg|text|border|ring|fill|stroke|from|via|to|shadow|outline|decoration|divide|placeholder|caret|accent";
  const NEUTRAL = new Set(["slate", "gray", "zinc", "neutral", "stone"]);
  const rules = [
    ["off-token colours", "must", new RegExp(`\\b(?:${UTIL})-(?:${PALETTE})-\\d{2,3}\\b|\\b(?:${UTIL})-(?:white|black)\\b|-\\[(?:#|rgb|hsl|oklch)[^\\]]*\\]|(?<![\\w&-])#[0-9a-fA-F]{6}\\b|(?<![\\w-])(?:rgba?|hsla?)\\(\\s*\\d`, "g"),
      "Use theme tokens (bg-background, text-muted-foreground, border-border, bg-primary) so the page takes the design doc's colours."],
    ["transition: all", "must", /\btransition-all\b|transition:\s*all\b/g, "Name the properties that change; `all` animates layout and repaints."],
    ["focus outline removed", "must", /\boutline-none\b(?![^"'`\n]*focus-visible:)|outline:\s*(?:none|0)\b/g, "Keep a visible focus ring: pair with focus-visible:ring-2."],
    ["image without alt", "must", /<img\b(?![^>]*\balt=)[^>]*>/g, 'Every <img> needs alt text (alt="" if decorative).'],
    ["click handler on a div", "must", /<(?:div|span)\b(?![^>]*\brole=)[^>]*\bonClick=/g, "Use <button> for actions and <a> for navigation."],
    ["h-screen", "must", /\b(?:min-)?h-screen\b/g, "Use h-dvh / min-h-dvh; h-screen is wrong under mobile browser chrome."],
    ["gradients", "info", /\bbg-(?:gradient|linear|radial|conic)-|(?:linear|radial|conic)-gradient\(/g, "Each gradient should be asked for by the design doc."],
    ["arbitrary values", "info", /-\[\d+(?:\.\d+)?(?:px|rem|em)\]/g, "Prefer the spacing and type scale over one-off values."],
    ["arbitrary z-index", "info", /\bz-\[\d+\]/g, "Use a fixed z scale."],
  ];
  const files = [];
  const walk = (p) => {
    if (!existsSync(p)) return;
    if (statSync(p).isDirectory()) { if (!/node_modules|\.next|dist|build|\.git|\.stashui/.test(p)) readdirSync(p).forEach((f) => walk(join(p, f))); }
    else if (/\.(tsx|jsx|ts|js|css|html|vue|svelte)$/.test(p)) files.push(p);
  };
  paths.forEach(walk);
  const found = rules.map(([name, level, , fix]) => ({ name, level, fix, count: 0, where: [] }));
  const hues = new Set(), fonts = new Set();
  let animates = false, guarded = false;
  for (const file of files) {
    const text = read(file), isCss = file.endsWith(".css");
    text.split("\n").forEach((line, n) => {
      if (isCss && /^\s*--[\w-]+\s*:/.test(line)) return;              // a token definition is where literals belong
      rules.forEach(([, , re], i) => {
        for (const m of line.matchAll(re)) {
          found[i].count++;
          if (found[i].where.length < 6) found[i].where.push(`${file}:${n + 1}  ${m[0].slice(0, 40)}`);
          const hue = i === 0 && m[0].match(new RegExp(`-(${PALETTE})-\\d`))?.[1];
          if (hue && !NEUTRAL.has(hue)) hues.add(hue);
        }
      });
      for (const m of line.matchAll(/font-\[['"]?([^\]'",]+)|font-family:\s*['"]?([^;'",]+)/g)) fonts.add((m[1] || m[2]).trim().toLowerCase());
      if (/\banimate-|<motion\.|@keyframes|transition-/.test(line)) animates = true;
      if (/prefers-reduced-motion|motion-reduce:|motion-safe:|useReducedMotion/.test(line)) guarded = true;
    });
  }
  if (animates && !guarded) found.push({ name: "no reduced-motion guard", level: "must", count: 1, where: [], fix: "Honour prefers-reduced-motion once, globally or with motion-reduce:." });
  found.push({ name: "accent hue families", level: "info", count: hues.size, where: [...hues], fix: "More than one hue family reads as several products. One accent per view." });
  found.push({ name: "font families declared", level: "info", count: fonts.size, where: [...fonts], fix: "Two families at most: one for text, one for display or code." });
  const failing = found.filter((f) => f.level === "must" && f.count);
  process.exitCode = failing.length ? 1 : 0;
  if (flags.json) return console.log(JSON.stringify({ files: files.length, pass: !failing.length, checks: found }, null, 2));
  console.log(`StashUI review · ${files.length} files · ${failing.length ? `${failing.length} checks failing` : "all must-be-zero checks pass"}`);
  for (const f of found) {
    console.log(`${f.level === "must" ? (f.count ? "FAIL" : "ok  ") : "info"}  ${String(f.count).padStart(4)}  ${f.name}${f.count && f.level === "must" ? `  -> ${f.fix}` : ""}`);
    if (f.count && f.where.length) f.where.forEach((w) => console.log(`            ${w}`));
  }
  console.log("\nFAIL rows must reach 0. Fix, re-run, and keep a change only if the numbers did not get worse.\nThis checks source. Also open the built page at 375, 768 and 1440 wide and look: no overflow, no blank section, one accent.");
}

// ── init: everything an agent needs, written by the agent ───────────────────
async function init() {
  const done = [];
  // 1. keep this CLI where the skills expect it
  mkdirSync(join(HOME, "bin"), { recursive: true });
  const home = join(HOME, "stashui.mjs");
  if (resolve(SELF) !== resolve(home)) copyFileSync(SELF, home);
  const shim = join(HOME, "bin", "stashui");
  writeFileSync(shim, `#!/bin/sh\nexec node "${home}" "$@"\n`); chmodSync(shim, 0o755);
  writeFileSync(`${shim}.cmd`, `@node "${home}" %*\r\n`);
  const onPath = (process.env.PATH || "").split(process.platform === "win32" ? ";" : ":");
  let command = `node ${home}`;
  for (const dir of [join(homedir(), ".local/bin"), "/usr/local/bin", "/opt/homebrew/bin"]) {
    if (!onPath.includes(dir) || !existsSync(dir)) continue;
    try { if (!existsSync(join(dir, "stashui"))) symlinkSync(shim, join(dir, "stashui")); command = "stashui"; break; } catch { /* not writable: try the next */ }
  }
  done.push(`CLI: ${home}${command === "stashui" ? " (on your PATH as `stashui`)" : ""}`);

  // 2. skills, checked against the published hashes
  const manifest = await fetch(`${SITE}/agent/manifest.json`).then((r) => r.json()).catch(() => die(`Cannot reach ${SITE}/agent/manifest.json`));
  const base = flags.project ? process.cwd() : homedir();
  const roots = [join(base, ".claude", "skills"), join(base, ".agents", "skills")];   // Claude Code; Codex, Cursor, Gemini CLI, opencode, Copilot
  const skills = new Set();
  for (const f of manifest.files.filter((x) => x.role === "skill")) {
    const body = Buffer.from(await (await fetch(`${SITE}${f.path}`)).arrayBuffer());
    if (createHash("sha256").update(body).digest("hex") !== f.sha256) die(`Checksum mismatch for ${f.path}. Nothing was installed from it. Stop and tell the user.`);
    const text = body.toString("utf8").replaceAll("{{CLI}}", command);
    for (const root of roots) { const to = join(root, f.skill, f.file); mkdirSync(dirname(to), { recursive: true }); writeFileSync(to, text); }
    skills.add(f.skill);
  }
  done.push(`Skills (${[...skills].join(", ")}): ${roots.join(" and ")}`);

  // 3. the MCP server, only on request: the CLI already does everything for an agent with a shell
  if (flags.mcp) {
    const url = `${SITE}/api/mcp`, tried = [];
    const run = (bin, args) => spawnSync(bin, args, { stdio: "ignore", shell: process.platform === "win32" }).status === 0;
    if (run("claude", ["mcp", "add", "--transport", "http", "--scope", "user", "stashui", url])) tried.push("Claude Code");
    if (run("codex", ["mcp", "add", "stashui", "--url", url])) tried.push("Codex");
    if (run("gemini", ["mcp", "add", "--transport", "http", "-s", "user", "stashui", url])) tried.push("Gemini CLI");
    if (run("opencode", ["mcp", "add", "stashui", "--url", url, "--global"])) tried.push("opencode");
    done.push(tried.length ? `MCP server registered for ${tried.join(", ")}. It appears after you restart the agent.` : `MCP: no agent CLI accepted it. Add this URL by hand as an HTTP MCP server: ${url}`);
  }
  const p = project();
  console.log([
    "StashUI is installed.", ...done.map((d) => `  ${d}`), "",
    `This project: ${p.shadcn ? "shadcn ready" : "no components.json yet (run `npx shadcn@latest init -d` before the first add)"}; ${p.design ? "DESIGN.md found" : "no DESIGN.md yet"}.`,
    `Next: read ${join(roots[0], "stashui", "SKILL.md")} and follow it for any UI work. Check with: ${command} browse`,
  ].join("\n"));
}

if (!cmd || cmd === "help" || flags.help) console.log(HELP);
else if (!commands[cmd]) die(`Unknown command "${cmd}".\n\n${HELP}`);
else await commands[cmd]();
