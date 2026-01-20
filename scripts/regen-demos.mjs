// Regenerate a safe demo for every registry component from the file on disk.
// Fixes any demos created by earlier importer versions (e.g. invalid JSX
// identifiers from digit-leading names like "3d-globe").
//
//   node scripts/regen-demos.mjs

import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { join, dirname, basename } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const registry = JSON.parse(readFileSync(join(root, "registry.json"), "utf8"));

function detectExport(code, name) {
  const valid = /^[A-Za-z_][A-Za-z0-9_]*$/;
  const pas = name
    .split(/[-_]/)
    .map((s) => (s[0] ? s[0].toUpperCase() + s.slice(1) : ""))
    .join("");
  const named = [
    ...code.matchAll(/export\s+(?:const|function|class)\s+([A-Z][A-Za-z0-9_]*)/g),
  ].map((m) => m[1]);
  // re-exports: export { Foo, Bar as Baz } [from "..."]
  for (const m of code.matchAll(/export\s*\{([^}]+)\}/g)) {
    for (const part of m[1].split(",")) {
      const t = part.trim().split(/\s+as\s+/);
      const exported = (t[1] || t[0]).trim();
      if (/^[A-Z][A-Za-z0-9_]*$/.test(exported)) named.push(exported);
    }
  }
  if (valid.test(pas) && named.includes(pas)) return { ident: pas, isDefault: false };
  if (/export\s+default/.test(code)) return { ident: "Cmp", isDefault: true };
  if (named.length) return { ident: named[0], isDefault: false };
  return null;
}

let written = 0;
for (const item of registry.items) {
  const primary = item.files?.[0]?.path;
  if (!primary) continue;
  const abs = join(root, primary);
  if (!existsSync(abs)) continue;
  const base = basename(primary).replace(/\.(tsx?)$/, "");
  // Only fill MISSING demos — never clobber hand-authored or agent-ported ones.
  if (existsSync(join(dirname(abs), `${base}.demo.tsx`))) continue;

  const code = readFileSync(abs, "utf8");
  const exp = detectExport(code, item.name);
  if (!exp) continue;
  const importBase = "@/" + primary.replace(/\.(tsx?)$/, "").replace(/^.*?registry\//, "registry/");
  const imp = exp.isDefault
    ? `import ${exp.ident} from "${importBase}";`
    : `import { ${exp.ident} } from "${importBase}";`;
  const demo = `${imp}\n\nexport default function Demo() {\n  return <${exp.ident} />;\n}\n`;
  writeFileSync(join(dirname(abs), `${base}.demo.tsx`), demo);
  written++;
}
console.log(`✓ Regenerated ${written} demos`);
