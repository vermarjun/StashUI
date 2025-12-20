// Generates gallery data from registry.json + the component source files.
//
//   node scripts/build-registry.mjs
//
// Produces two files (do not edit them by hand):
//   src/registry/registry.gen.ts  — metadata + inlined source code (server-safe)
//   src/registry/demos.gen.ts     — name -> demo component map (client-safe)
//
// Run `npm run registry` to regenerate these AND emit installable JSON to
// public/r via `shadcn build`.

import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const registryPath = join(root, "registry.json");
const sourcesPath = join(root, "registry", "sources.json");
const outDir = join(root, "src", "__registry__");

const manifest = JSON.parse(readFileSync(registryPath, "utf8"));

// Optional attribution sidecar: name -> { library, url, ported, originFramework }.
// `ported: true` => we converted it (e.g. from Vue) and treat it as our own (no
// credit shown). Otherwise we show "More components like this -> <library>".
const sources = existsSync(sourcesPath)
  ? JSON.parse(readFileSync(sourcesPath, "utf8"))
  : {};

// Type classification sidecar: name -> type (buttons, cards, backgrounds, …).
// Decoupled from the source library, which is now only used for credit.
const categoriesPath = join(root, "registry", "categories.json");
const typeMap = existsSync(categoriesPath)
  ? JSON.parse(readFileSync(categoriesPath, "utf8"))
  : {};

// Title sidecar: name -> human-readable title (overrides meaningless registry
// titles like "Comp 163").
const titlesPath = join(root, "registry", "titles.json");
const titleMap = existsSync(titlesPath)
  ? JSON.parse(readFileSync(titlesPath, "utf8"))
  : {};

function pascal(name) {
  return name
    .split(/[-_/]/g)
    .filter(Boolean)
    .map((s) => s[0].toUpperCase() + s.slice(1))
    .join("");
}

function slugify(s) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Pull every import/export module specifier out of a source file. */
function importSpecifiers(code) {
  const specs = new Set();
  const fromRe = /(?:import|export)[\s\S]*?from\s*["']([^"']+)["']/g;
  const bareRe = /import\s*["']([^"']+)["']/g;
  let m;
  while ((m = fromRe.exec(code))) specs.add(m[1]);
  while ((m = bareRe.exec(code))) specs.add(m[1]);
  return [...specs];
}

/**
 * Decide which frameworks a component is portable to by inspecting its imports.
 * A component is universal (works in plain React AND Next.js) unless it pulls in
 * a Next-only module. Returns { frameworks, warnings }.
 */
function analyzeCompat(name, code) {
  const specs = importSpecifiers(code);
  const nextOnly = specs.filter((s) => s === "next" || s.startsWith("next/"));
  const serverOnly = specs.includes("server-only");
  const warnings = [];

  let frameworks = ["react", "next"];
  if (nextOnly.length) {
    frameworks = ["next"];
    warnings.push(
      `"${name}" imports ${nextOnly.join(", ")} — Next.js only. ` +
        `Swap for a portable equivalent (e.g. asChild + an <a>, a plain <img>) to keep it cross-framework.`,
    );
  }
  if (serverOnly) {
    warnings.push(
      `"${name}" imports "server-only" — it cannot run as a client component.`,
    );
  }
  return { frameworks, warnings };
}

const entries = [];
const demoMap = [];
const compatWarnings = [];

let skipped = 0;
for (const item of manifest.items) {
  const primary = item.files?.[0];
  if (!primary) continue;

  let code;
  try {
    code = readFileSync(join(root, primary.path), "utf8").trimEnd();
  } catch {
    skipped++;
    continue; // unreadable source — skip rather than crash the whole build
  }

  const demoRel = primary.path.replace(/\.tsx$/, ".demo.tsx");
  const hasDemo = existsSync(join(root, demoRel));
  if (!hasDemo) {
    console.warn(`! No demo found for "${item.name}" (expected ${demoRel})`);
  }
  const demoCode = hasDemo
    ? readFileSync(join(root, demoRel), "utf8").trimEnd()
    : "";

  const { frameworks, warnings } = analyzeCompat(item.name, code);
  compatWarnings.push(...warnings);

  // Attribution: only surface a credit for components imported as-is (not ported).
  const src = sources[item.name];
  const source =
    src && !src.ported && src.library
      ? { library: src.library, url: src.url ?? "" }
      : null;
  const library = source ? source.library : null;
  const librarySlug = library ? slugify(library) : null;

  entries.push({
    name: item.name,
    title: titleMap[item.name] ?? item.title ?? item.name,
    description: item.description ?? "",
    category: typeMap[item.name] ?? item.categories?.[0] ?? "misc",
    dependencies: item.dependencies ?? [],
    registryDependencies: item.registryDependencies ?? [],
    frameworks,
    source,
    library,
    librarySlug,
    code,
    demoCode,
  });

  if (hasDemo) {
    // "registry/buttons/x.demo.tsx" -> "@/registry/buttons/x.demo"
    const importPath =
      "@/" + demoRel.replace(/\.tsx$/, "").replace(/^.*?registry\//, "registry/");
    // lazy() so each demo is its own chunk — importing the map costs nothing
    // until a preview actually mounts.
    demoMap.push(`  ${JSON.stringify(item.name)}: lazy(() => import(${JSON.stringify(importPath)})),`);
  }
}

const categories = [...new Set(entries.map((e) => e.category))];

// Library directory (only categories that came from external imports).
const libraryMap = {};
for (const e of entries)
  if (e.library) {
    const m = (libraryMap[e.library] ??= { count: 0, url: "" });
    m.count++;
    if (!m.url && e.source?.url) {
      try {
        m.url = new URL(e.source.url).origin;
      } catch {
        /* ignore bad url */
      }
    }
  }
const libraries = Object.entries(libraryMap)
  .map(([name, { count, url }]) => ({ name, slug: slugify(name), count, url }))
  .sort((a, b) => b.count - a.count);

// Our own (hand-built / ported) categories — everything not from a library.
const ownCategories = categories.filter(
  (c) => !entries.some((e) => e.category === c && e.library),
);

const banner = `// AUTO-GENERATED by scripts/build-registry.mjs — do not edit by hand.\n`;

const registryFile = `${banner}
export interface RegistryEntry {
  name: string;
  title: string;
  description: string;
  category: string;
  dependencies: string[];
  registryDependencies: string[];
  /** Frameworks this component is portable to, e.g. ["react", "next"]. */
  frameworks: string[];
  /** Where it came from (only for components imported as-is, shown as credit). */
  source: { library: string; url: string } | null;
  /** Source library display name (null for our own / ported components). */
  library: string | null;
  /** Slug of the source library, for routing (/library/<slug>). */
  librarySlug: string | null;
  /** Full source of the component, ready to copy. */
  code: string;
  /** Source of the demo/usage example. */
  demoCode: string;
}

export const categories = ${JSON.stringify(categories)} as const;

export const registry: RegistryEntry[] = ${JSON.stringify(entries, null, 2)};

export function getEntry(name: string): RegistryEntry | undefined {
  return registry.find((e) => e.name === name);
}
`;

const metaFile = `${banner}
export interface ComponentMeta {
  name: string;
  title: string;
  description: string;
  category: string;
  frameworks: string[];
  library: string | null;
  librarySlug: string | null;
}

export interface LibraryInfo {
  name: string;
  slug: string;
  count: number;
  url: string;
}

export const categories = ${JSON.stringify(categories)} as const;
export type Category = (typeof categories)[number];

/** Categories we authored or ported (treated as our own). */
export const ownCategories = ${JSON.stringify(ownCategories)} as const;

/** External libraries we imported components from (as-is, credited). */
export const libraries: LibraryInfo[] = ${JSON.stringify(libraries, null, 2)};

export const componentsMeta: ComponentMeta[] = ${JSON.stringify(
  entries.map(({ name, title, description, category, frameworks, library, librarySlug }) => ({
    name,
    title,
    description,
    category,
    frameworks,
    library,
    librarySlug,
  })),
  null,
  2,
)};
`;

const demosFile = `${banner}import { lazy } from "react";
import type { ComponentType, LazyExoticComponent } from "react";

export const demos: Record<string, LazyExoticComponent<ComponentType>> = {
${demoMap.join("\n")}
};
`;

mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "registry.gen.ts"), registryFile);
writeFileSync(join(outDir, "meta.gen.ts"), metaFile);
writeFileSync(join(outDir, "demos.gen.ts"), demosFile);

const universal = entries.filter((e) => e.frameworks.includes("react")).length;

console.log(
  `✓ Generated ${entries.length} components across ${categories.length} categories (${skipped} skipped).`,
);
console.log(
  `  ${universal}/${entries.length} are universal (React + Next.js portable).`,
);
if (compatWarnings.length) {
  console.warn("\n⚠ Cross-framework compatibility warnings:");
  for (const w of compatWarnings) console.warn(`  • ${w}`);
}
