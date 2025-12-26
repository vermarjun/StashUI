// Static import resolver over registry components. Reports (and optionally
// quarantines) components that can't build, and lists missing shadcn primitives.
//
//   node scripts/resolve-check.mjs           # report only
//   node scripts/resolve-check.mjs --apply    # quarantine broken components
//
// A component is "broken" if its primary file (or any registry sibling it
// transitively imports) references an import that doesn't resolve:
//   - a bare npm package not in node_modules
//   - a @/components/ui/<x> primitive we don't have
//   - a @/registry/<slug>/<x> or relative sibling file that doesn't exist

import { readFileSync, existsSync, readdirSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { transformSync } from "esbuild";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const apply = process.argv.includes("--apply");

const BUILTIN_OK = new Set(["react", "react-dom", "next", "@/lib/utils"]);

// installed packages (top-level + scoped)
const nm = join(root, "node_modules");
const installed = new Set();
for (const e of readdirSync(nm)) {
  if (e.startsWith("@")) {
    for (const s of readdirSync(join(nm, e))) installed.add(`${e}/${s}`);
  } else installed.add(e);
}
function pkgName(spec) {
  if (spec.startsWith("@")) return spec.split("/").slice(0, 2).join("/");
  return spec.split("/")[0];
}

function specifiers(code) {
  const specs = new Set();
  const re1 = /(?:from|import)\s*["']([^"']+)["']/g;
  let m;
  while ((m = re1.exec(code))) specs.add(m[1]);
  return [...specs];
}

function resolveFile(p) {
  for (const ext of ["", ".tsx", ".ts", ".jsx", ".js"]) {
    if (existsSync(p + ext)) return p + ext;
  }
  return null;
}

const fileCache = new Map();
const fileBroken = new Map(); // path -> reason

function checkFile(absPath, seen = new Set()) {
  if (fileBroken.has(absPath)) return fileBroken.get(absPath);
  if (seen.has(absPath)) return null;
  seen.add(absPath);
  let code = fileCache.get(absPath);
  if (code === undefined) {
    code = existsSync(absPath) ? readFileSync(absPath, "utf8") : null;
    fileCache.set(absPath, code);
  }
  if (code === null) return `missing file ${absPath}`;

  // syntax check — a parse error here would break the shared demos chunk
  try {
    transformSync(code, { loader: "tsx", jsx: "automatic" });
  } catch {
    return `syntax error ${absPath.replace(root + "/", "")}`;
  }

  for (const spec of specifiers(code)) {
    if (BUILTIN_OK.has(spec)) continue;
    if (spec.startsWith("@/registry/")) {
      const rel = spec.replace("@/registry/", "registry/");
      const t = resolveFile(join(root, rel));
      if (!t) return `unresolved ${spec}`;
      const sub = checkFile(t, seen);
      if (sub) return sub;
    } else if (spec.startsWith("@/components/ui/")) {
      const t = resolveFile(join(root, "src", spec.replace("@/", "")));
      if (!t) return `missing primitive ${spec}`;
    } else if (spec.startsWith("@/")) {
      const t = resolveFile(join(root, "src", spec.replace("@/", "")));
      if (!t) return `unresolved ${spec}`;
    } else if (spec.startsWith(".")) {
      const t = resolveFile(join(dirname(absPath), spec));
      if (!t) return `unresolved ${spec}`;
      const sub = checkFile(t, seen);
      if (sub) return sub;
    } else {
      const name = pkgName(spec);
      if (!installed.has(name)) return `missing pkg ${name}`;
    }
  }
  return null;
}

const registry = JSON.parse(readFileSync(join(root, "registry.json"), "utf8"));
const sourcesPath = join(root, "registry", "sources.json");
const sources = existsSync(sourcesPath)
  ? JSON.parse(readFileSync(sourcesPath, "utf8"))
  : {};

const broken = [];
const missingPrimitives = new Map();
const missingPkgs = new Map();

for (const item of registry.items) {
  const primary = item.files?.[0]?.path;
  if (!primary) continue;
  const abs = resolveFile(join(root, primary));
  if (!abs) {
    broken.push({ name: item.name, reason: "missing primary file" });
    continue;
  }
  // Validate the component AND its demo (demos.gen imports the demo, and a
  // broken demo breaks the shared chunk for every page).
  const demoAbs = resolveFile(abs.replace(/\.(tsx?)$/, ".demo"));
  const reason = checkFile(abs) || (demoAbs ? checkFile(demoAbs) : null);
  if (reason) {
    broken.push({ name: item.name, reason });
    if (reason.startsWith("missing primitive")) {
      const p = reason.split(" ")[2];
      missingPrimitives.set(p, (missingPrimitives.get(p) || 0) + 1);
    }
    if (reason.startsWith("missing pkg")) {
      const p = reason.split(" ")[2];
      missingPkgs.set(p, (missingPkgs.get(p) || 0) + 1);
    }
  }
}

console.log(`Total components: ${registry.items.length}`);
console.log(`Broken (would be quarantined): ${broken.length}`);

const reasonHist = new Map();
for (const b of broken) {
  const key = b.reason.replace(/registry\/[^/]+\//, "registry/<lib>/").split(" ").slice(0, 2).join(" ");
  reasonHist.set(key, (reasonHist.get(key) || 0) + 1);
}
console.log(
  `\nReason buckets:\n` +
    [...reasonHist.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 20)
      .map(([r, n]) => `  ${n}\t${r}`)
      .join("\n"),
);
console.log(
  `\nMissing shadcn primitives (add these to rescue components):\n` +
    [...missingPrimitives.entries()]
      .sort((a, b) => b[1] - a[1])
      .map(([p, n]) => `  ${p.replace("@/components/ui/", "")} (${n})`)
      .join("\n"),
);
console.log(
  `\nMissing npm packages:\n` +
    [...missingPkgs.entries()]
      .sort((a, b) => b[1] - a[1])
      .map(([p, n]) => `  ${p} (${n})`)
      .join("\n"),
);

if (apply) {
  const brokenNames = new Set(broken.map((b) => b.name));
  registry.items = registry.items.filter((i) => !brokenNames.has(i.name));
  for (const b of broken) delete sources[b.name];
  writeFileSync(
    join(root, "registry.json"),
    JSON.stringify(registry, null, 2) + "\n",
  );
  writeFileSync(sourcesPath, JSON.stringify(sources, null, 2) + "\n");
  writeFileSync(
    join(root, "scripts", "_quarantined.json"),
    JSON.stringify(broken, null, 2) + "\n",
  );
  console.log(`\n✓ Quarantined ${broken.length} components. ${registry.items.length} remain.`);
}
