// Ground-truth validation: bundle every demo with esbuild (real module
// resolution + syntax). Any file that fails — and every component that
// transitively imports it — is quarantined. One pass, converges.
//
//   node scripts/validate-build.mjs           # report
//   node scripts/validate-build.mjs --apply    # quarantine broken components

import { readFileSync, writeFileSync, existsSync, readdirSync, statSync, rmSync } from "node:fs";
import { join, dirname, basename, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { build } from "esbuild";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const apply = process.argv.includes("--apply");

// Match Turbopack: only DIRECT dependencies are resolvable. Externalize those;
// anything else (incl. transitive-only deps) errors — exactly as Next will.
const pkg = JSON.parse(readFileSync(join(root, "package.json"), "utf8"));
const installed = new Set([
  ...Object.keys(pkg.dependencies || {}),
  ...Object.keys(pkg.devDependencies || {}),
]);

const registry = JSON.parse(readFileSync(join(root, "registry.json"), "utf8"));
const sourcesPath = join(root, "registry", "sources.json");
const sources = existsSync(sourcesPath) ? JSON.parse(readFileSync(sourcesPath, "utf8")) : {};

// demo entry per component
const entries = [];
const demoToComp = new Map();
for (const item of registry.items) {
  const primary = item.files?.[0]?.path;
  if (!primary) continue;
  const demo = join(root, primary.replace(/\.(tsx?)$/, ".demo.tsx"));
  if (existsSync(demo)) {
    entries.push(demo);
    demoToComp.set(demo, item.name);
  }
}

// Packages we BUNDLE (so esbuild verifies their named exports) instead of
// externalizing — these are where vendor components hit export mismatches.
const VERIFY = new Set([
  "lucide-react",
  "@tsparticles/react",
  "@tsparticles/slim",
  "@splinetool/runtime",
  "react-icons",
]);

// Plugin: mirror Turbopack's resolution. Bare imports must be DIRECT deps,
// else error (catches transitive-only like styled-components). Direct deps are
// externalized unless in VERIFY (then bundled to check exports).
const turbopackResolve = {
  name: "turbopack-resolve",
  setup(b) {
    b.onResolve({ filter: /.*/ }, (args) => {
      if (args.kind === "entry-point") return;
      const spec = args.path;
      if (spec.startsWith(".") || spec.startsWith("/") || spec.startsWith("@/")) return;
      const name = spec.startsWith("@") ? spec.split("/").slice(0, 2).join("/") : spec.split("/")[0];
      if (VERIFY.has(name)) return; // bundle -> verify exports
      if (installed.has(name)) return { path: spec, external: true };
      return {
        errors: [
          { text: `non-direct dependency "${name}"`, location: { file: args.importer } },
        ],
      };
    });
  },
};

console.log(`Bundling ${entries.length} demos with esbuild…`);
let result;
try {
  result = await build({
    entryPoints: entries,
    bundle: true,
    write: false,
    outdir: "/tmp/esbuild-validate-out",
    format: "esm",
    jsx: "automatic",
    logLevel: "silent",
    logLimit: 0,
    tsconfig: join(root, "tsconfig.json"),
    plugins: [turbopackResolve],
    loader: {
      ".css": "empty", ".scss": "empty", ".svg": "text", ".png": "dataurl",
      ".jpg": "dataurl", ".jpeg": "dataurl", ".gif": "dataurl", ".webp": "dataurl",
      ".glsl": "text", ".frag": "text", ".vert": "text", ".json": "json",
    },
  });
} catch (e) {
  result = e;
}
const errors = result.errors || [];
console.log(`esbuild reported ${errors.length} errors`);

// collect failing files (normalized to a registry/... path)
const badFiles = new Set();
for (const err of errors) {
  let f = err.location?.file;
  if (!f) continue;
  const i = f.indexOf("registry/");
  if (i >= 0) f = f.slice(i);
  else f = relative(root, f);
  badFiles.add(f);
}

// build reverse import graph over registry files to find affected components
function walk(dir, out = []) {
  for (const e of readdirSync(dir)) {
    const p = join(dir, e);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (/\.(tsx?)$/.test(e)) out.push(p);
  }
  return out;
}
function resolveFile(p) {
  for (const ext of ["", ".tsx", ".ts", ".jsx", ".js"]) if (existsSync(p + ext)) return p + ext;
  for (const ext of [".tsx", ".ts"]) if (existsSync(join(p, "index" + ext))) return join(p, "index" + ext);
  return null;
}
const importers = new Map(); // file -> set of files that import it
const allFiles = walk(join(root, "registry"));
for (const f of allFiles) {
  const code = readFileSync(f, "utf8");
  for (const m of code.matchAll(/(?:from|import)\s*["']([^"']+)["']/g)) {
    const spec = m[1];
    let target = null;
    if (spec.startsWith("@/registry/")) target = resolveFile(join(root, spec.replace("@/", "")));
    else if (spec.startsWith(".")) target = resolveFile(join(dirname(f), spec));
    if (target) {
      const rel = relative(root, target);
      if (!importers.has(rel)) importers.set(rel, new Set());
      importers.get(rel).add(relative(root, f));
    }
  }
}

// reverse BFS: any file importing a bad file is also bad
const closure = new Set(badFiles);
const queue = [...badFiles];
while (queue.length) {
  const f = queue.shift();
  for (const imp of importers.get(f) || []) {
    if (!closure.has(imp)) {
      closure.add(imp);
      queue.push(imp);
    }
  }
}

// a component is broken if its primary or demo file is in the closure
const broken = [];
for (const item of registry.items) {
  const primary = item.files?.[0]?.path;
  if (!primary) continue;
  const demo = primary.replace(/\.(tsx?)$/, ".demo.tsx");
  if (closure.has(primary) || closure.has(demo)) broken.push(item.name);
}

console.log(`Failing files: ${badFiles.size}, affected (closure): ${closure.size}`);
console.log(`Broken components: ${broken.length} / ${registry.items.length}`);
if (errors.length)
  console.log(
    "\nSample errors:\n" +
      errors.slice(0, 12).map((e) => `  ${e.location?.file || "?"} — ${e.text}`).join("\n"),
  );

if (apply && broken.length) {
  // Keep the components listed (code + install + attribution) — only remove the
  // broken demo so it no longer enters the compile graph. Shows "No preview".
  const set = new Set(broken);
  let del = 0;
  for (const item of registry.items) {
    if (!set.has(item.name)) continue;
    const primary = item.files?.[0]?.path;
    if (!primary) continue;
    const demo = join(root, primary.replace(/\.(tsx?)$/, ".demo.tsx"));
    if (existsSync(demo)) {
      rmSync(demo);
      del++;
    }
  }
  console.log(`\n✓ Removed ${del} broken demos (components kept, shown without preview).`);
}
