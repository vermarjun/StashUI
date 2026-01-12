// Merge the Inspira UI Vue->React ports into registry.json as OUR OWN
// components (ported: true => no attribution credit). Categorized semantically.
//
//   node scripts/merge-ported.mjs

import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const manifest = JSON.parse(
  readFileSync(join(root, "registry", "inspira-react", "_manifest.json"), "utf8"),
);
const registry = JSON.parse(readFileSync(join(root, "registry.json"), "utf8"));
const sourcesPath = join(root, "registry", "sources.json");
const sources = existsSync(sourcesPath) ? JSON.parse(readFileSync(sourcesPath, "utf8")) : {};

const used = new Set(registry.items.map((i) => i.name));
let added = 0;

for (const e of manifest) {
  if (!e.ok) continue;
  const file = `registry/inspira-react/${e.name}.tsx`;
  if (!existsSync(join(root, file))) continue;

  const name = used.has(e.name) ? `inspira-${e.name}` : e.name;
  used.add(name);

  registry.items.push({
    name,
    type: "registry:component",
    title: e.title || e.name,
    description: e.description || "",
    categories: [e.category || "misc"],
    dependencies: [],
    registryDependencies: [],
    files: [
      { path: file, type: "registry:component", target: `components/ui/${name}.tsx` },
    ],
  });
  // ported => treated as ours: no credit shown, grouped in its semantic category
  sources[name] = { library: "Inspira UI", url: "https://inspira-ui.com", ported: true };
  added++;
}

writeFileSync(join(root, "registry.json"), JSON.stringify(registry, null, 2) + "\n");
writeFileSync(sourcesPath, JSON.stringify(sources, null, 2) + "\n");
console.log(`✓ Merged ${added} ported components. ${registry.items.length} total.`);
