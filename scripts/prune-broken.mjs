// Removes registry items whose COMPONENT file doesn't compile (unresolvable
// imports / syntax) — dead weight you can neither preview nor copy usefully.
// Uses esbuild with the same resolution rules as Turbopack (direct deps only).
//
//   node scripts/prune-broken.mjs --apply

import { readFileSync, writeFileSync, existsSync, readdirSync, statSync, rmSync } from "node:fs";
import { join, dirname, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { build } from "esbuild";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const apply = process.argv.includes("--apply");

const pkg = JSON.parse(readFileSync(join(root, "package.json"), "utf8"));
const installed = new Set([
  ...Object.keys(pkg.dependencies || {}),
  ...Object.keys(pkg.devDependencies || {}),
]);
const VERIFY = new Set(["lucide-react", "@tsparticles/react", "react-icons"]);

const reg = JSON.parse(readFileSync(join(root, "registry.json"), "utf8"));
const entries = [];
const fileToItem = new Map();
for (const it of reg.items) {
  const p = it.files?.[0]?.path;
  if (!p || !existsSync(join(root, p))) continue;
  entries.push(join(root, p));
  fileToItem.set(p, it.name);
}

const plugin = {
  name: "turbopack-resolve",
  setup(b) {
    b.onResolve({ filter: /.*/ }, (args) => {
      if (args.kind === "entry-point") return;
      const s = args.path;
      if (s.startsWith(".") || s.startsWith("/") || s.startsWith("@/")) return;
      const name = s.startsWith("@") ? s.split("/").slice(0, 2).join("/") : s.split("/")[0];
      if (VERIFY.has(name)) return;
      if (installed.has(name)) return { path: s, external: true };
      return { errors: [{ text: `non-direct dep ${name}`, location: { file: args.importer } }] };
    });
  },
};

let result;
try {
  result = await build({
    entryPoints: entries,
    bundle: true, write: false, outdir: "/tmp/prune-out",
    format: "esm", jsx: "automatic", logLevel: "silent", logLimit: 0,
    tsconfig: join(root, "tsconfig.json"), plugins: [plugin],
    loader: { ".css": "empty", ".svg": "text", ".png": "dataurl", ".jpg": "dataurl",
      ".jpeg": "dataurl", ".gif": "dataurl", ".webp": "dataurl", ".glsl": "text",
      ".frag": "text", ".vert": "text", ".json": "json" },
  });
} catch (e) { result = e; }
const errors = result.errors || [];

// reverse-reachability: an item is broken if its file (or a registry sibling it
// transitively imports) fails
function walk(d, o = []) { for (const e of readdirSync(d)) { const p = join(d, e);
  statSync(p).isDirectory() ? walk(p, o) : (/\.(tsx?)$/.test(e) && o.push(p)); } return o; }
function resolveFile(p) {
  for (const x of ["", ".tsx", ".ts", ".jsx", ".js"]) if (existsSync(p + x)) return p + x;
  for (const x of [".tsx", ".ts"]) if (existsSync(join(p, "index" + x))) return join(p, "index" + x);
  return null;
}
const importers = new Map();
for (const f of walk(join(root, "registry"))) {
  const code = readFileSync(f, "utf8");
  for (const m of code.matchAll(/(?:from|import)\s*["']([^"']+)["']/g)) {
    const s = m[1]; let t = null;
    if (s.startsWith("@/registry/")) t = resolveFile(join(root, s.replace("@/", "")));
    else if (s.startsWith(".")) t = resolveFile(join(dirname(f), s));
    if (t) { const r = relative(root, t); (importers.get(r) ?? importers.set(r, new Set()).get(r)).add(relative(root, f)); }
  }
}
const bad = new Set();
for (const e of errors) { let f = e.location?.file; if (!f) continue;
  const i = f.indexOf("registry/"); bad.add(i >= 0 ? f.slice(i) : relative(root, f)); }
const closure = new Set(bad); const q = [...bad];
while (q.length) { const f = q.shift(); for (const imp of importers.get(f) || []) if (!closure.has(imp)) { closure.add(imp); q.push(imp); } }

const broken = reg.items.filter((it) => closure.has(it.files?.[0]?.path));
console.log(`esbuild errors: ${errors.length}; broken components: ${broken.length} / ${reg.items.length}`);

if (apply && broken.length) {
  const set = new Set(broken.map((b) => b.name));
  const sources = JSON.parse(readFileSync(join(root, "registry/sources.json"), "utf8"));
  const cats = JSON.parse(readFileSync(join(root, "registry/categories.json"), "utf8"));
  const titles = JSON.parse(readFileSync(join(root, "registry/titles.json"), "utf8"));
  for (const it of broken) {
    const p = it.files?.[0]?.path;
    if (p) for (const f of [p, p.replace(/\.(tsx?)$/, ".demo.tsx")]) if (existsSync(join(root, f))) rmSync(join(root, f));
    delete sources[it.name]; delete cats[it.name]; delete titles[it.name];
  }
  reg.items = reg.items.filter((i) => !set.has(i.name));
  writeFileSync(join(root, "registry.json"), JSON.stringify(reg, null, 2) + "\n");
  writeFileSync(join(root, "registry/sources.json"), JSON.stringify(sources, null, 2) + "\n");
  writeFileSync(join(root, "registry/categories.json"), JSON.stringify(cats, null, 2) + "\n");
  writeFileSync(join(root, "registry/titles.json"), JSON.stringify(titles, null, 2) + "\n");
  console.log(`✓ Pruned ${broken.length} uncompilable components. ${reg.items.length} remain.`);
}
