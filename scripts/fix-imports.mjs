// One-time repair of imports in already-imported registry files so they resolve
// against our tree:
//   - any ".../lib/utils"            -> "@/lib/utils"
//   - any ".../ui/<primitive>"       -> "@/components/ui/<primitive>"
//   - any ".../hooks/<hook>"         -> "@/hooks/<hook>"
//
// Run: node scripts/fix-imports.mjs

import { readFileSync, writeFileSync, readdirSync, statSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const registryDir = join(root, "registry");

function walk(dir, out = []) {
  for (const e of readdirSync(dir)) {
    const p = join(dir, e);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (/\.(tsx?|jsx?)$/.test(e)) out.push(p);
  }
  return out;
}

function fixSpec(spec) {
  if (/\/lib\/utils$/.test(spec) && spec !== "@/lib/utils") return "@/lib/utils";
  if (!spec.startsWith("@/components/ui/")) {
    const m = spec.match(/\/ui\/([a-zA-Z0-9_-]+)$/);
    if (m) return `@/components/ui/${m[1]}`;
  }
  const h = spec.match(/\/hooks\/([a-zA-Z0-9_-]+)$/);
  if (h && !spec.startsWith("@/hooks/")) return `@/hooks/${h[1]}`;
  return spec;
}

let changed = 0;
for (const file of walk(registryDir)) {
  const before = readFileSync(file, "utf8");
  const after = before
    .replace(/(from\s*["'])([^"']+)(["'])/g, (_, a, s, c) => a + fixSpec(s) + c)
    .replace(/(import\s*["'])([^"']+)(["'])/g, (_, a, s, c) => a + fixSpec(s) + c);
  if (after !== before) {
    writeFileSync(file, after);
    changed++;
  }
}
console.log(`✓ Rewrote imports in ${changed} files`);
