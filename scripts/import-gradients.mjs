// Imports a large set of CSS gradients as components into registry/gradients/.
//
//   node scripts/import-gradients.mjs
//
// Source: itmeo/webgradients (CC0). Each gradient becomes a small, copy-pasteable
// React component that renders the gradient + a demo, plus a registry.json entry
// and attribution.

import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const registryPath = join(root, "registry.json");
const sourcesPath = join(root, "registry", "sources.json");
const dir = join(root, "registry", "gradients");
const SRC = "https://raw.githubusercontent.com/itmeo/webgradients/master/gradients-parsed.json";

function slugify(s) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}
function pascal(s) {
  return s.split(/[^a-z0-9]+/i).filter(Boolean).map((w) => w[0].toUpperCase() + w.slice(1)).join("");
}
function cssGradient(g) {
  const stops = g.gradient.map((s) => `${s.color} ${s.pos}%`).join(", ");
  return `linear-gradient(${g.deg}deg, ${stops})`;
}

const data = await (await fetch(SRC)).json();
mkdirSync(dir, { recursive: true });

const registry = JSON.parse(readFileSync(registryPath, "utf8"));
const sources = existsSync(sourcesPath) ? JSON.parse(readFileSync(sourcesPath, "utf8")) : {};
const used = new Set(registry.items.map((i) => i.name));

const newItems = [];
for (const g of data) {
  const base = slugify(g.name);
  const name = used.has(`gradient-${base}`) ? `gradient-${base}-${g.index}` : `gradient-${base}`;
  used.add(name);
  const comp = `Gradient${pascal(g.name)}`;
  const gradient = cssGradient(g);

  const file = `import * as React from "react";
import { cn } from "@/lib/utils";

/** "${g.name}" gradient. */
export const ${comp}_CSS = "${gradient}";

export function ${comp}({ className, style, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("h-40 w-full rounded-xl", className)}
      style={{ backgroundImage: "${gradient}", ...style }}
      {...props}
    />
  );
}
`;
  const demo = `import { ${comp} } from "@/registry/gradients/${base}";

export default function Demo() {
  return <${comp} className="h-44 w-72 shadow-lg" />;
}
`;
  writeFileSync(join(dir, `${base}.tsx`), file);
  writeFileSync(join(dir, `${base}.demo.tsx`), demo);

  newItems.push({
    name,
    type: "registry:component",
    title: g.name,
    description: `A "${g.name}" CSS gradient.`,
    categories: ["Gradients"],
    dependencies: [],
    registryDependencies: [],
    files: [
      { path: `registry/gradients/${base}.tsx`, type: "registry:component", target: `components/ui/${name}.tsx` },
    ],
  });
  sources[name] = { library: "WebGradients", url: "https://webgradients.com", ported: false };
}

registry.items = registry.items.filter((i) => i.categories?.[0] !== "Gradients").concat(newItems);
writeFileSync(registryPath, JSON.stringify(registry, null, 2) + "\n");
writeFileSync(sourcesPath, JSON.stringify(sources, null, 2) + "\n");
console.log(`✓ Imported ${newItems.length} gradients into registry/gradients/`);
