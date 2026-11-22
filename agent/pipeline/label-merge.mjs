#!/usr/bin/env node
// Validates what the vision pass returned and files it as agent/data/labels/<name>.json.
// Anything outside the contract is dropped and reported, never silently kept.
//   node agent/pipeline/label-merge.mjs <work-dir>
import { mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const work = process.argv[2];
const kinds = new Set(JSON.parse(readFileSync(join(ROOT, "agent/pipeline/kinds.json"), "utf8")).kinds.map((k) => k.id));
const LOOK = new Set(("flat outlined glass gradient neon glow shadowed textured 3d skeuomorphic monochrome colorful pastel dark light rounded sharp pill " +
  "minimal dense airy bold playful technical editorial luxurious brutalist retro futuristic organic corporate").split(" "));
const TONE = new Set("minimal decorative playful technical dramatic".split(" "));
const known = new Set(readdirSync(join(ROOT, "agent-index/index/components")).map((f) => f.replace(/\.json$/, "")));
mkdirSync(join(ROOT, "agent/data/labels"), { recursive: true });

let filed = 0; const problems = [];
for (const f of readdirSync(join(work, "out")).filter((f) => f.endsWith(".json")).sort()) {
  let rows;
  try { rows = JSON.parse(readFileSync(join(work, "out", f), "utf8")); } catch (e) { problems.push(`${f}: not JSON (${e.message})`); continue; }
  const expected = JSON.parse(readFileSync(join(work, f), "utf8")).map((r) => r.name);
  const got = new Set(rows.map((r) => r.name));
  for (const n of expected) if (!got.has(n)) problems.push(`${f}: missing ${n}`);
  for (const r of rows) {
    if (!known.has(r.name)) { problems.push(`${f}: unknown component ${r.name}`); continue; }
    if (!kinds.has(r.kind)) { problems.push(`${f}: ${r.name} has invalid kind "${r.kind}"`); continue; }
    const clean = {
      kind: r.kind,
      ...(typeof r.blurb === "string" && r.blurb.trim() && { blurb: r.blurb.trim().slice(0, 110) }),
      ...(typeof r.use === "string" && r.use.trim() && { use: r.use.trim().slice(0, 140) }),
      look: (Array.isArray(r.look) ? r.look : []).filter((w) => LOOK.has(w)).slice(0, 5),
      ...(TONE.has(r.tone) && { tone: r.tone }),
    };
    writeFileSync(join(ROOT, "agent/data/labels", `${r.name}.json`), JSON.stringify(clean));
    filed++;
  }
}
console.log(`filed ${filed} labels; ${problems.length} problems`);
problems.slice(0, 40).forEach((p) => console.log("  " + p));
