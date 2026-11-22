#!/usr/bin/env node
// Everything an agent is served, generated from what is on disk.
//
//   agent-index/index/components/*.json   text record per component (upstream pipeline)
//   registry/quality.json                 1..5 visual review score
//   agent/data/facets/<name>.json         measured from the clip by pipeline/tiles.py
//   agent/data/records/<name>.json        the full record from frames + code (pipeline/describe.md)
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
import { existsSync, mkdirSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync } from "node:fs";
import { dirname, join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const at = (...p) => join(ROOT, ...p);
const json = (p, fallback) => (existsSync(p) ? JSON.parse(readFileSync(p, "utf8")) : fallback);
const config = json(at("agent/config.json"));
// A local flavour for end-to-end tests: STASHUI_SITE=http://127.0.0.1:4317 STASHUI_OUT=/some/dir/public
if (process.env.STASHUI_SITE) config.site = process.env.STASHUI_SITE;
const PUBLIC = process.env.STASHUI_OUT || at("public");
const { kinds } = json(at("agent/pipeline/kinds.json"));
const kindById = new Map(kinds.map((k) => [k.id, k]));
const kindFromCategory = new Map(kinds.flatMap((k) => k.from.map((c) => [c, k.id])));
const quality = json(at("registry/quality.json"), {});

const out = join(PUBLIC, "agent");
mkdirSync(join(out, "items"), { recursive: true });

// What an install really needs, read from the files it writes. The registry item's own
// registryDependencies is often empty, so shadcn would not fetch the primitives; and some
// components import a sibling file the item does not ship. Both are found here, per component.
function installNeeds(name) {
  const item = json(join(PUBLIC, "r", `${name}.json`), null);
  if (!item) return { primitives: [], unresolved: [] };
  const base = (p) => p.split("/").pop().replace(/\.\w+$/, "");
  const own = new Set(item.files.map((f) => base(f.path)));
  const primitives = new Set(item.registryDependencies || []), unresolved = new Set();
  for (const f of item.files) {
    for (const [, imp] of (f.content || "").matchAll(/from\s+["'](@\/[^"']+|\.{1,2}\/[^"']+)["']/g)) {
      if (imp === "@/lib/utils") continue;
      if (imp.startsWith("@/components/ui/")) { if (!own.has(base(imp))) primitives.add(base(imp)); continue; }
      if (own.has(base(imp))) continue;                      // a file the item ships
      unresolved.add(imp);
    }
  }
  primitives.delete("utils");
  return { primitives: [...primitives].sort(), unresolved: [...unresolved].sort() };
}

const clip = (s, n) => (s && s.length > n ? s.slice(0, n - 1).trimEnd() + "…" : s || "");
const items = [];
let unlabelled = 0, untiled = 0, incomplete = 0, described = 0;

for (const file of readdirSync(at("agent-index/index/components")).sort()) {
  const r = json(at("agent-index/index/components", file));
  const facets = json(at("agent/data/facets", `${r.name}.json`), null);
  const rec = json(at("agent/data/records", `${r.name}.json`), null);
  if (rec) described++;
  const hasTile = existsSync(join(out, "tiles", `${r.name}.webp`));
  if (!hasTile) untiled++;

  // kind: the record decides; a component not yet described falls back to its category
  let kind = rec?.kind && kindById.has(rec.kind) ? rec.kind : null;
  if (!kind) {
    unlabelled++;
    kind = (r.categories || [r.category]).map((c) => kindFromCategory.get(c)).find(Boolean) || "other";
  }
  const t = rec?.traits || r.traits || {};
  const needs = installNeeds(r.name);
  if (needs.unresolved.length) incomplete++;
  const blurb = clip(rec?.tagline || r.blurb || r.description || r.title, 110);

  items.push({
    name: r.name,
    title: r.title,
    kind,
    scale: kindById.get(kind).scale,
    blurb,
    look: rec?.look || [],                         // what it looks like, in fixed words
    use: clip(rec?.use_when || r.use_when, 140),
    text: rec ? [rec.summary, rec.appearance, rec.behaviour, rec.parts.join(", ")].join(" ")
      : clip([r.description, r.avoid_when].filter(Boolean).join(" "), 320), // searched, not shown in lists
    ...(rec && {
      phrases: [...rec.search_phrases, ...rec.resembles],   // how people ask for it; searched, not shown
      technique: rec.technique, weight: rec.weight, content: rec.content_from, suits: rec.suits,
      motion: rec.traits.motion, polish: rec.polish,
      ...(rec.frames.render !== "ok" && { render: rec.frames.render }),
    }),
    categories: r.categories || [r.category],
    origin: r.origin,
    trigger: t.trigger || [],
    tone: rec?.tone || t.tone || null,
    theme: t.theme || "both",
    deps: (r.npm_deps || []).length,
    colours: r.hardcoded_colors ?? 0,
    quality: quality[r.name] ?? 3,
    tile: hasTile,
    ...(r.dupe_group && { dupe: r.dupe_group }),
    ...(needs.unresolved.length && { unresolved: needs.unresolved.length }),
    ...(facets && {
      size: facets.size, bleed: facets.bleed, accents: facets.accents,
      vivid: facets.vivid, lum: facets.luminance, moves: facets.motion, film: facets.film,
    }),
  });

  writeFileSync(join(out, "items", `${r.name}.json`), JSON.stringify({
    name: r.name, title: r.title, kind, origin: r.origin,
    description: rec?.summary || r.description || blurb,
    use: rec?.use_when || r.use_when || "", avoid: rec?.avoid_when || r.avoid_when || "",
    a11y: rec ? `${rec.a11y.note} (keyboard: ${rec.a11y.keyboard}, labels: ${rec.a11y.labels}, reduced motion: ${rec.a11y.reduced_motion ? "respected" : "not handled"})` : r.a11y || "",
    ...(rec && {
      looks: rec.appearance, behaves: rec.behaviour, parts: rec.parts, states: rec.states,
      content: rec.content_from, customise: rec.customise, weight: `${rec.weight}: ${rec.weight_why}`, responsive: rec.responsive,
      demo: rec.demo_content, issues: rec.issues, suits: rec.suits, polish: rec.polish, polishWhy: rec.polish_why,
      // what the recording is worth: which of the six frames to trust, and whether it shows the interaction at all
      frames: { best: rec.frames.best, usable: rec.frames.usable, shows: rec.frames.shows_interaction, render: rec.frames.render, note: rec.frames.render_note },
    }),
    exports: r.exports || [], props: rec?.props?.length ? rec.props : r.props || [],
    npm: r.npm_deps || [], registry: needs.primitives, unresolved: needs.unresolved,
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
  mkdirSync(dirname(join(PUBLIC, to)), { recursive: true });
  writeFileSync(join(PUBLIC, to), body);
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
    const rel = relative(at("agent/skills"), p).split(sep).join("/");   // published paths use forward slashes on every OS
    files.push({ role: "skill", skill: rel.split("/")[0], file: rel.split("/").slice(1).join("/"), ...publish(p, `agent/skills/${rel}`) });
    if (rel.endsWith("/SKILL.md")) {
      const fm = readFileSync(p, "utf8").match(/^---\n([\s\S]*?)\n---/)?.[1] || "";
      const field = (k) => fm.match(new RegExp(`^${k}:\\s*(.+)$`, "m"))?.[1].trim() || "";
      skills.push({ name: field("name"), description: field("description"), url: `${config.site}/agent/skills/${rel}` });
    }
  }
}
for (const [from, to] of [["agent/site/setup.md", "setup.md"], ["agent/site/llms.txt", "llms.txt"], ["agent/site/proposal.html", "agent/proposal.html"],
  ["agent/site/playground.html", "agent/playground.html"]]) {
  if (existsSync(at(from))) publish(at(from), to);
}
writeFileSync(join(out, "manifest.json"), JSON.stringify({ protocol: config.protocol, site: config.site, files }, null, 2));
for (const dir of ["agent-skills", "skills"]) {            // current RFC path, and the legacy one some tools still read
  mkdirSync(join(PUBLIC, ".well-known", dir), { recursive: true });
  writeFileSync(join(PUBLIC, ".well-known", dir, "index.json"), JSON.stringify({ skills }, null, 2));
}

const kb = (p) => Math.round(statSync(p).size / 1024);
console.log(`catalog: ${items.length} components, ${kb(join(out, "catalog.json"))} KB`);
console.log(`  described from frames + code: ${described}   not yet: ${items.length - described}`);
console.log(`  kind from vision pass: ${items.length - unlabelled}   from category fallback: ${unlabelled}`);
console.log(`  with a tile: ${items.length - untiled}   without: ${untiled}`);
console.log(`  install leaves an import unresolved: ${incomplete}   (each is flagged in view and add, and ranked lower)`);
console.log(`published: ${files.length} client files, ${skills.length} skills`);
