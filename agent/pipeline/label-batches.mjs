#!/usr/bin/env node
// Prepares work for the vision pass: numbered sheets of the components that have
// no label yet, each with the text already known about them.
//   node agent/pipeline/label-batches.mjs <work-dir> [--all]
// Then one agent per few batches follows agent/pipeline/label.md and writes
// <work-dir>/out/batch-NN.json. `label-merge.mjs` validates and files the results.
import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { compose } from "../core/sheet.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
process.env.STASHUI_PUBLIC = join(ROOT, "public");
const work = process.argv[2];
if (!work) { console.error("usage: label-batches.mjs <work-dir> [--all]"); process.exit(1); }
const all = process.argv.includes("--all");
mkdirSync(join(work, "out"), { recursive: true });

const { kinds } = JSON.parse(readFileSync(join(ROOT, "agent/pipeline/kinds.json"), "utf8"));
writeFileSync(join(work, "kinds.txt"), kinds.map((k) => `${k.id}  [${k.scale}]  ${k.aka.join(", ")}`).join("\n"));

const records = readdirSync(join(ROOT, "agent-index/index/components")).map((f) => JSON.parse(readFileSync(join(ROOT, "agent-index/index/components", f), "utf8")))
  .filter((r) => existsSync(join(ROOT, "public/agent/tiles", `${r.name}.webp`)))
  .filter((r) => all || !existsSync(join(ROOT, "agent/data/labels", `${r.name}.json`)))
  .sort((a, b) => a.category.localeCompare(b.category) || a.name.localeCompare(b.name));   // siblings side by side

const SIZE = 20;
for (let b = 0; b * SIZE < records.length; b++) {
  const batch = records.slice(b * SIZE, (b + 1) * SIZE), id = String(b + 1).padStart(2, "0");
  writeFileSync(join(work, `batch-${id}.jpg`), await compose({ cols: 5, cells: batch.map((r, i) => ({ name: r.name, badge: String(i + 1) })) }));
  writeFileSync(join(work, `batch-${id}.json`), JSON.stringify(batch.map((r, i) => ({
    n: i + 1, name: r.name, title: r.title, categories: r.categories, blurb: r.blurb || null,
    description: (r.description || "").slice(0, 160) || null, use: r.use_when || null,
  })), null, 1));
}
console.log(`${records.length} components to label, ${Math.ceil(records.length / SIZE)} batches in ${work}`);
