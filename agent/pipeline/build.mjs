#!/usr/bin/env node
// Everything an agent is served, generated from what is on disk.
//
//   agent-index/index/components/*.json   text record per component (upstream pipeline)
//   registry/quality.json                 1..5 visual review score
//   agent/data/facets/<name>.json         measured from the clip by pipeline/tiles.py
//   agent/data/labels/<name>.json         kind + wording from the vision pass (pipeline/label.md)
//   agent/pipeline/kinds.json             the taxonomy
//
// writes, all under public/ so they deploy as static files and the server reads them from disk:
//
//   public/agent/catalog.json             one compact row per component: what search ranks on
//   public/agent/items/<name>.json        the detail a `view` needs
//   public/agent/stashui.mjs              the CLI
//   public/agent/skills/**                the skills
//   public/agent/manifest.json            every installable file with its sha256
//   public/setup.md                       the one document a user's agent follows
//   public/.well-known/agent-skills/index.json
//
// Run: npm run agent
import { createHash } from "node:crypto";
import { cpSync, existsSync, mkdirSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const at = (...p) => join(ROOT, ...p);
const json = (p, fallback) => (existsSync(p) ? JSON.parse(readFileSync(p, "utf8")) : fallback);
const config = json(at("agent/config.json"));
const { kinds } = json(at("agent/pipeline/kinds.json"));
const kindById = new Map(kinds.map((k) => [k.id, k]));
const kindFromCategory = new Map(kinds.flatMap((k) => k.from.map((c) => [c, k.id])));
const quality = json(at("registry/quality.json"), {});

const out = at("public/agent");
mkdirSync(join(out, "items"), { recursive: true });

const clip = (s, n) => (s && s.length > n ? s.slice(0, n - 1).trimEnd() + "…" : s || "");
const items = [];
let unlabelled = 0, untiled = 0;

for (const file of readdirSync(at("agent-index/index/components")).sort()) {
  const r = json(at("agent-index/index/components", file));
  const facets = json(at("agent/data/facets", `${r.name}.json`), null);
  const label = json(at("agent/data/labels", `${r.name}.json`), null);
  const hasTile = existsSync(at("public/agent/tiles", `${r.name}.webp`));
  if (!hasTile) untiled++;

  // kind: the vision pass decides; until it has run, fall back to the category
  let kind = label?.kind && kindById.has(label.kind) ? label.kind : null;
  if (!kind) {
    unlabelled++;
    kind = (r.categories || [r.category]).map((c) => kindFromCategory.get(c)).find(Boolean) || "other";
  }
  const t = r.traits || {};
  const blurb = clip(label?.blurb || r.blurb || r.description || r.title, 110);

  items.push({
    name: r.name,
    title: r.title,
    kind,
    scale: kindById.get(kind).scale,
    blurb,
    look: label?.look || [],                       // what it looks like, in fixed words
    use: clip(label?.use || r.use_when, 140),
    text: clip([r.description, r.avoid_when].filter(Boolean).join(" "), 320), // searched, not shown in lists
    categories: r.categories || [r.category],
    origin: r.origin,
    trigger: t.trigger || [],
    tone: label?.tone || t.tone || null,
    theme: t.theme || "both",
    deps: (r.npm_deps || []).length,
    colours: r.hardcoded_colors ?? 0,
    quality: quality[r.name] ?? 3,
    tile: hasTile,
    ...(r.dupe_group && { dupe: r.dupe_group }),
    ...(facets && {
      size: facets.size, bleed: facets.bleed, accents: facets.accents,
      vivid: facets.vivid, lum: facets.luminance, moves: facets.motion, film: facets.film,
    }),
  });

  writeFileSync(join(out, "items", `${r.name}.json`), JSON.stringify({
    name: r.name, title: r.title, kind, origin: r.origin,
    description: r.description || blurb,
    use: label?.use || r.use_when || "", avoid: r.avoid_when || "", a11y: r.a11y || "",
    exports: r.exports || [], props: r.props || [],
    npm: r.npm_deps || [], registry: (r.registry_deps || []).filter((d) => d !== "utils"),
    colours: r.hardcoded_colors ?? 0, sizedParent: !!t.needs_sized_parent, css: !!r.css,
    alternatives: (r.alternatives || []).map((a) => a.name || a).slice(0, 4),
    usage: r.usage || "",
    file: `components/ui/${r.name}.tsx`,
    registryItem: `${config.site}/r/${r.name}.json`,
    live: `${config.site}/c/${r.name}`,
  }));
}

const count = (k) => items.filter((i) => i.kind === k.id).length;
writeFileSync(join(out, "catalog.json"), JSON.stringify({
  protocol: config.protocol,
  site: config.site,
  kinds: kinds.map((k) => ({ id: k.id, scale: k.scale, aka: k.aka, count: count(k) })).filter((k) => k.count),
  items,
}));

// ── publish the client side: CLI, skills, setup doc, manifest ──────────────────
const sha = (buf) => createHash("sha256").update(buf).digest("hex");
const walk = (dir) => readdirSync(dir).flatMap((f) => {
  const p = join(dir, f);
  return statSync(p).isDirectory() ? walk(p) : [p];
});
let cliSha = "";
const fill = (s) => s.replaceAll("{{SITE}}", config.site).replaceAll("{{PROTOCOL}}", config.protocol).replaceAll("{{CLI_SHA256}}", cliSha);

rmSync(join(out, "skills"), { recursive: true, force: true });
const files = [];
const publish = (from, to) => {
  const body = fill(readFileSync(from, "utf8"));
  mkdirSync(dirname(join(ROOT, "public", to)), { recursive: true });
  writeFileSync(join(ROOT, "public", to), body);
  return { path: `/${to}`, sha256: sha(body), bytes: Buffer.byteLength(body) };
};
if (existsSync(at("agent/cli/stashui.mjs"))) {
  const cli = publish(at("agent/cli/stashui.mjs"), "agent/stashui.mjs");
  cliSha = cli.sha256;
  files.push({ role: "cli", ...cli });
}
const skills = [];
if (existsSync(at("agent/skills"))) {
  for (const p of walk(at("agent/skills"))) {
    const rel = relative(at("agent/skills"), p);
    files.push({ role: "skill", skill: rel.split("/")[0], file: rel.split("/").slice(1).join("/"), ...publish(p, `agent/skills/${rel}`) });
    if (rel.endsWith("/SKILL.md")) {
      const fm = readFileSync(p, "utf8").match(/^---\n([\s\S]*?)\n---/)?.[1] || "";
      const field = (k) => fm.match(new RegExp(`^${k}:\\s*(.+)$`, "m"))?.[1].trim() || "";
      skills.push({ name: field("name"), description: field("description"), url: `${config.site}/agent/skills/${rel}` });
    }
  }
}
for (const [from, to] of [["agent/site/setup.md", "setup.md"], ["agent/site/llms.txt", "llms.txt"], ["agent/site/proposal.html", "agent/proposal.html"]]) {
  if (existsSync(at(from))) publish(at(from), to);
}
writeFileSync(join(out, "manifest.json"), JSON.stringify({ protocol: config.protocol, site: config.site, files }, null, 2));
for (const dir of ["agent-skills", "skills"]) {            // current RFC path, and the legacy one some tools still read
  mkdirSync(at("public/.well-known", dir), { recursive: true });
  writeFileSync(at("public/.well-known", dir, "index.json"), JSON.stringify({ skills }, null, 2));
}

const kb = (p) => Math.round(statSync(p).size / 1024);
console.log(`catalog: ${items.length} components, ${kb(join(out, "catalog.json"))} KB`);
console.log(`  kind from vision pass: ${items.length - unlabelled}   from category fallback: ${unlabelled}`);
console.log(`  with a tile: ${items.length - untiled}   without: ${untiled}`);
console.log(`published: ${files.length} client files, ${skills.length} skills`);
