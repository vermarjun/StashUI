#!/usr/bin/env node
// Meaning vectors for search. Every component gets one vector for its
// description and one per search phrase; a query is matched against all of them
// and a component scores as its best-matching vector.
//
//   agent/data/records/<name>.json   the record (pipeline/describe.md)
//   public/agent/catalog.json        fallback text for a component with no record yet
//
// writes
//
//   public/agent/search/vectors.bin  int8, one 384-number row per vector
//   public/agent/search/index.json   model, names, and which component owns each row
//
// 1,100 components embed in well under a minute on a laptop, so this is rebuilt
// whenever records change and is never the expensive step.
//
// Run: npm run agent:search     (after npm run agent)
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { embedder, MODEL, DIM } from "../core/embed.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const PUBLIC = process.env.STASHUI_OUT || join(ROOT, "public");
const json = (p, fallback) => (existsSync(p) ? JSON.parse(readFileSync(p, "utf8")) : fallback);

const cat = json(join(PUBLIC, "agent/catalog.json"));
const aka = new Map(cat.kinds.map((k) => [k.id, k.aka || []]));

/** The texts one component is found by: [description, ...phrases]. */
export function textsFor(item, rec) {
  if (!rec) return [[item.title, item.blurb, item.use, item.text].filter(Boolean).join(". ")];
  const doc = [
    `${item.title}.`, rec.tagline, rec.appearance, rec.behaviour,
    `Parts: ${rec.parts.join(", ")}.`, rec.use_when,
    `Kind: ${rec.kind.replaceAll("-", " ")}${aka.get(rec.kind)?.length ? ` (${aka.get(rec.kind).slice(0, 4).join(", ")})` : ""}.`,
  ].join(" ");
  return [doc, ...rec.search_phrases, ...rec.resembles.map((r) => `like ${r.toLowerCase()}`)];
}

const names = [], owner = [], texts = [];
let withRecord = 0;
for (const item of cat.items) {
  const rec = json(join(ROOT, "agent/data/records", `${item.name}.json`), null);
  if (rec) withRecord++;
  const at = names.push(item.name) - 1;
  for (const t of textsFor(item, rec)) { owner.push(at); texts.push(t); }
}

const embed = await embedder();
if (!embed) { console.error("search index: the embedding model could not be loaded"); process.exit(1); }
const out = new Int8Array(texts.length * DIM);
const t0 = Date.now();
for (let i = 0; i < texts.length; i += 64) {
  const rows = await embed(texts.slice(i, i + 64));
  rows.forEach((v, j) => { for (let k = 0; k < DIM; k++) out[(i + j) * DIM + k] = Math.max(-127, Math.min(127, Math.round(v[k] * 127))); });
}
mkdirSync(join(PUBLIC, "agent/search"), { recursive: true });
writeFileSync(join(PUBLIC, "agent/search/vectors.bin"), out);
writeFileSync(join(PUBLIC, "agent/search/index.json"), JSON.stringify({ model: MODEL, dim: DIM, names, owner }));
console.log(`search index: ${texts.length} vectors for ${names.length} components (${withRecord} with a record) in ${((Date.now() - t0) / 1000).toFixed(1)}s, ` +
  `${Math.round(out.byteLength / 1024)} KB`);
