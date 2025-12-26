// Imports components from external shadcn-compatible registries into our library.
//
//   node scripts/import-lib.mjs            # process every library in libraries.json
//   node scripts/import-lib.mjs "Magic UI" # process one (by display name)
//
// For each library it:
//   - enumerates component names (explicit list, or by parsing an index URL,
//     with optional type/name filtering)
//   - fetches each component's registry JSON CONCURRENTLY (inline content)
//   - writes all files, namespaced under registry/<slug>/, flattened by basename
//   - rewrites internal imports so siblings resolve in our tree
//   - appends an item to registry.json and an attribution row to sources.json
//   - generates a best-effort demo (real previews are improved by a later pass)

import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import { join, dirname, basename } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const registryPath = join(root, "registry.json");
const sourcesPath = join(root, "registry", "sources.json");
const librariesPath = join(root, "scripts", "libraries.json");
const reportPath = join(root, "scripts", "_import-report.json");

const CONCURRENCY = 12;
const CORE_DEPS = new Set(["react", "react-dom", "next", "tailwindcss"]);

const onlyLib = process.argv[2];

function slugify(s) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

async function fetchJson(url, tries = 3) {
  for (let i = 0; i < tries; i++) {
    try {
      const ctrl = new AbortController();
      const t = setTimeout(() => ctrl.abort(), 20000);
      const res = await fetch(url, {
        signal: ctrl.signal,
        headers: { "user-agent": "myui-importer" },
        redirect: "follow",
      });
      clearTimeout(t);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (e) {
      if (i === tries - 1) throw e;
      await new Promise((r) => setTimeout(r, 600 * (i + 1)));
    }
  }
}

function rewriteImports(code, slug, internal) {
  const repl = (spec) => {
    if (spec === "@/lib/utils") return spec;
    const base = basename(spec).replace(/\.(tsx?|jsx?)$/, "");
    if (spec.startsWith("@/components/ui/"))
      return internal.has(base) ? `@/registry/${slug}/${base}` : spec;
    if (spec.startsWith("@/"))
      return internal.has(base) ? `@/registry/${slug}/${base}` : spec;
    if (spec.startsWith("."))
      return internal.has(base) ? `@/registry/${slug}/${base}` : spec;
    return spec;
  };
  return code
    .replace(/(from\s*["'])([^"']+)(["'])/g, (_, a, s, c) => a + repl(s) + c)
    .replace(/(import\s*["'])([^"']+)(["'])/g, (_, a, s, c) => a + repl(s) + c);
}

function detectExport(code, name) {
  const pas = name
    .split(/[-_]/)
    .map((s) => (s[0] ? s[0].toUpperCase() + s.slice(1) : ""))
    .join("");
  const valid = /^[A-Za-z_][A-Za-z0-9_]*$/;
  const named = [
    ...code.matchAll(/export\s+(?:const|function|class)\s+([A-Z][A-Za-z0-9_]*)/g),
  ].map((m) => m[1]);
  if (valid.test(pas) && named.includes(pas)) return { ident: pas, isDefault: false };
  if (/export\s+default/.test(code)) return { ident: "Cmp", isDefault: true };
  if (named.length) return { ident: named[0], isDefault: false };
  return null;
}

function makeDemo(slug, primaryBase, exp) {
  if (!exp) return null;
  const imp = exp.isDefault
    ? `import ${exp.ident} from "@/registry/${slug}/${primaryBase}";`
    : `import { ${exp.ident} } from "@/registry/${slug}/${primaryBase}";`;
  return `${imp}\n\nexport default function Demo() {\n  return <${exp.ident} />;\n}\n`;
}

async function enumerateNames(lib) {
  let names = [];
  if (Array.isArray(lib.componentNames) && lib.componentNames.length) {
    names = lib.componentNames.slice();
  } else if (lib.indexUrl) {
    const idx = await fetchJson(lib.indexUrl);
    let arr = Array.isArray(idx) ? idx : idx.items || [];
    const types = lib.indexTypeIn || (lib.indexTypeEquals ? [lib.indexTypeEquals] : null);
    if (types)
      arr = arr.filter((it) => typeof it === "object" && types.includes(it.type));
    names = arr.map((it) => (typeof it === "string" ? it : it.name)).filter(Boolean);
  }
  if (lib.nameMatch) {
    const re = new RegExp(lib.nameMatch);
    names = names.filter((n) => re.test(n));
  }
  if (lib.nameExclude) {
    const re = new RegExp(lib.nameExclude);
    names = names.filter((n) => !re.test(n));
  }
  return [...new Set(names)];
}

function importOne(item, lib, slug, dir, state) {
  const files = (item.files || []).filter((f) => f.content);
  if (!files.length) return false;

  const internal = new Set(
    files.map((f) => basename(f.path).replace(/\.(tsx?|jsx?)$/, "")),
  );
  const itemName = item.name || item.__name;
  const outName = (p) => {
    let b = basename(p).replace(/\.jsx$/, ".tsx").replace(/\.js$/, ".ts");
    if (!/\.[tj]sx?$/.test(b)) b += ".tsx";
    return b;
  };
  // Prefer a .tsx component file over .ts data files when choosing the primary.
  const tsxFiles = files.filter((f) => /\.tsx$/.test(outName(f.path)));
  const primary =
    files.find((f) => basename(f.path).replace(/\.(tsx?|jsx?)$/, "") === itemName) ||
    tsxFiles.find((f) => /registry:(ui|component)/.test(f.type || "")) ||
    tsxFiles[0] ||
    files.find((f) => /registry:(ui|component)/.test(f.type || "")) ||
    files[0];

  // Name the primary output by the UNIQUE item name (many libraries name their
  // component file "index.tsx", which would otherwise collide on flatten).
  const safeBase = itemName.replace(/[^a-zA-Z0-9_-]/g, "-").replace(/^-+|-+$/g, "");
  const primaryOut = `${safeBase}.tsx`;
  for (const f of files) {
    const b = f === primary ? primaryOut : outName(f.path);
    // never let a secondary file clobber the primary
    if (f !== primary && b === primaryOut) continue;
    writeFileSync(join(root, `registry/${slug}/${b}`), rewriteImports(f.content, slug, internal));
  }
  const primaryBase = primaryOut.replace(/\.(tsx?)$/, "");

  const exp = detectExport(primary.content, itemName);
  const demo = makeDemo(slug, primaryBase, exp);
  if (demo) writeFileSync(join(dir, `${primaryBase}.demo.tsx`), demo);

  (item.dependencies || []).forEach((d) => {
    const bare = d.split("@")[0] || d;
    if (!CORE_DEPS.has(bare)) state.npmDeps.add(d);
  });
  (item.registryDependencies || []).forEach((d) => {
    if (!/^https?:/.test(d)) state.registryDeps.add(d);
  });

  const uniqueName = state.usedNames.has(itemName) ? `${slug}-${itemName}` : itemName;
  state.usedNames.add(uniqueName);

  state.items.push({
    name: uniqueName,
    type: "registry:component",
    title: (item.title || itemName).replace(/[-_]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
    description: item.description || `${lib.library} component.`,
    categories: [lib.library],
    dependencies: (item.dependencies || []).filter((d) => !CORE_DEPS.has(d.split("@")[0])),
    registryDependencies: (item.registryDependencies || []).filter((d) => !/^https?:/.test(d)),
    files: [
      {
        path: `registry/${slug}/${primaryOut}`,
        type: "registry:component",
        target: `components/ui/${uniqueName}.tsx`,
      },
    ],
  });

  state.sources[uniqueName] = {
    library: lib.library,
    url: lib.attributionBase ? `${lib.attributionBase}/${itemName}` : lib.siteUrl || "",
    ported: false,
  };
  return true;
}

async function processLibrary(lib, state) {
  if (lib.method !== "shadcn-registry") {
    console.log(`- skip "${lib.library}" (method: ${lib.method})`);
    return;
  }
  const slug = slugify(lib.library);
  const dir = join(root, "registry", slug);
  mkdirSync(dir, { recursive: true });

  const names = await enumerateNames(lib);
  console.log(`\n▶ ${lib.library} (${slug}): ${names.length} components`);

  const counters = { ok: 0, fail: 0 };
  const queue = names.slice();
  const worker = async () => {
    while (queue.length) {
      const name = queue.shift();
      const url = lib.perComponentUrl.replace("{name}", name);
      try {
        const item = await fetchJson(url);
        item.__name = name;
        importOne(item, lib, slug, dir, state) ? counters.ok++ : counters.fail++;
      } catch {
        counters.fail++;
      }
    }
  };
  await Promise.all(Array.from({ length: CONCURRENCY }, worker));
  console.log(`  ✓ ${counters.ok} imported, ${counters.fail} skipped/failed`);
}

// ---- main ----
const libraries = JSON.parse(readFileSync(librariesPath, "utf8"));
const registry = JSON.parse(readFileSync(registryPath, "utf8"));
const sources = existsSync(sourcesPath)
  ? JSON.parse(readFileSync(sourcesPath, "utf8"))
  : {};

const targets = onlyLib
  ? libraries.filter((l) => l.library === onlyLib)
  : libraries.filter((l) => l.enabled !== false);
const targetLibNames = new Set(targets.map((l) => l.library));

// Keep our originals + any imported libs we're NOT re-importing this run.
const keptItems = registry.items.filter((i) => {
  const cat = i.categories?.[0];
  return !targetLibNames.has(cat);
});

const state = {
  items: [],
  sources,
  npmDeps: new Set(),
  registryDeps: new Set(),
  usedNames: new Set(keptItems.map((i) => i.name)),
};

for (const lib of targets) {
  try {
    await processLibrary(lib, state);
  } catch (e) {
    console.error(`! ${lib.library} failed: ${e.message}`);
  }
}

registry.items = keptItems.concat(state.items);
writeFileSync(registryPath, JSON.stringify(registry, null, 2) + "\n");
writeFileSync(sourcesPath, JSON.stringify(state.sources, null, 2) + "\n");

const prevReport = existsSync(reportPath) ? JSON.parse(readFileSync(reportPath, "utf8")) : {};
const npm = new Set([...(prevReport.npmDeps || []), ...state.npmDeps]);
const reg = new Set([...(prevReport.registryDeps || []), ...state.registryDeps]);
writeFileSync(
  reportPath,
  JSON.stringify({ npmDeps: [...npm].sort(), registryDeps: [...reg].sort() }, null, 2) + "\n",
);

console.log(
  `\n=== Imported ${state.items.length} this run; ${registry.items.length} total in registry. ` +
    `npm deps seen: ${npm.size} (see scripts/_import-report.json) ===`,
);
