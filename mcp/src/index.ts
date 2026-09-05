#!/usr/bin/env node
/**
 * StashUI MCP server.
 *
 * Four layers, each answering exactly one question, each costing only what that
 * question needs:
 *
 *   stashui_categories  which category?          ~4 KB
 *   stashui_category    which component?         ~2-16 KB, one row each
 *   stashui_component   is this the one?         ~1 KB
 *   stashui_code        how is it built?         on request only
 *
 * Plus stashui_slot (cuts across categories, for a design doc's slot list) and
 * stashui_install (the flow ends in installed components, not names).
 *
 * Every response is read from one file. No file holds the whole tree.
 */
import { readFileSync, existsSync, readdirSync } from "node:fs";
import { join, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const HERE = dirname(fileURLToPath(import.meta.url));

function findIndex(): string {
  const candidates = [
    process.env.STASHUI_INDEX,
    join(HERE, "..", "index"),
    join(HERE, "..", "..", "agent-index", "index"),
  ].filter(Boolean) as string[];
  for (const c of candidates) {
    if (existsSync(join(c, "categories.json"))) return resolve(c);
  }
  throw new Error(
    `No StashUI index found. Looked in:\n  ${candidates.join("\n  ")}\n` +
      `Set STASHUI_INDEX to the directory containing categories.json.`,
  );
}
const INDEX = findIndex();
const REPO = resolve(INDEX, "..", "..");

const readJson = (p: string) => JSON.parse(readFileSync(p, "utf8"));
const text = (s: string) => ({ content: [{ type: "text" as const, text: s.trim() }] });

const categoryList = (): string[] =>
  readdirSync(join(INDEX, "categories")).filter((f) => f.endsWith(".json")).map((f) => f.slice(0, -5));

const componentExists = (name: string) => existsSync(join(INDEX, "components", `${name}.json`));

/**
 * Near misses, so a wrong name costs one retry rather than five.
 *
 * Character-bigram overlap (Dice), not substring containment: the commonest bad
 * name is a typo, and "magnetc-buton" contains no substring of "magnetic-button".
 */
const bigrams = (s: string): Set<string> => {
  const k = s.toLowerCase().replace(/[^a-z0-9]/g, "");
  const out = new Set<string>();
  for (let i = 0; i < k.length - 1; i++) out.add(k.slice(i, i + 2));
  return out;
};

function suggest(name: string): string[] {
  const q = bigrams(name);
  if (!q.size) return [];
  const all = readdirSync(join(INDEX, "components")).map((f) => f.slice(0, -5));
  return all
    .map((n) => {
      const b = bigrams(n);
      let shared = 0;
      for (const g of q) if (b.has(g)) shared++;
      return { n, score: (2 * shared) / (q.size + b.size) };
    })
    .filter((x) => x.score > 0.4)
    .sort((a, b) => b.score - a.score)
    .slice(0, 6)
    .map((x) => x.n);
}

const pad = (s: string, n: number) => (s.length >= n ? s : s + " ".repeat(n - s.length));

// ------------------------------------------------------------------ layer 1
function renderCategories(): string {
  const d = readJson(join(INDEX, "categories.json"));
  const lines = [
    `StashUI — ${d.total} React components, installable with shadcn.`,
    ``,
    `Pick the category whose description matches the slot you are filling, then`,
    `call stashui_category on it. "see also" names categories that overlap.`,
    ``,
  ];
  for (const c of d.categories) {
    lines.push(`${pad(c.slug, 16)}${String(c.count).padStart(4)}  ${c.summary || "(no summary)"}`);
    const extra: string[] = [];
    if (c.common_slots?.length) extra.push(`slots: ${c.common_slots.join(", ")}`);
    if (c.see_also?.length) extra.push(`see also: ${c.see_also.join(", ")}`);
    if (extra.length) lines.push(`${" ".repeat(22)}${extra.join("   ·   ")}`);
  }
  return lines.join("\n");
}

// ------------------------------------------------------------------ layer 2
function renderCategory(slug: string, f: Filters): string {
  const p = join(INDEX, "categories", `${slug}.json`);
  if (!existsSync(p)) {
    const all = categoryList();
    return `No category "${slug}". Valid categories: ${all.join(", ")}`;
  }
  const d = readJson(p);
  let rows = d.components as Row[];
  const applied: string[] = [];
  if (f.trigger) { rows = rows.filter((r) => r.trigger?.includes(f.trigger!)); applied.push(`trigger=${f.trigger}`); }
  if (f.tone) { rows = rows.filter((r) => r.tone === f.tone); applied.push(`tone=${f.tone}`); }
  if (f.slot) { rows = rows.filter((r) => r.slots?.includes(f.slot!)); applied.push(`slot=${f.slot}`); }
  if (f.no_deps) { rows = rows.filter((r) => r.flags?.includes("pure")); applied.push("no_deps"); }
  if (f.clean_only) { rows = rows.filter((r) => !r.flags?.some((x) => /^\d+c$/.test(x))); applied.push("clean_only"); }

  const head = applied.length
    ? `${slug} — ${rows.length} of ${d.count} components (${applied.join(", ")})`
    : `${slug} — ${d.count} components`;
  const lines = d.summary ? [head, ``, d.summary, ``] : [head, ``];
  if (!rows.length) {
    lines.push(`Nothing matched. Drop a filter, or call stashui_category("${slug}") unfiltered.`);
    return lines.join("\n");
  }
  const w = Math.min(34, Math.max(...rows.map((r) => r.name.length)) + 1);
  for (const r of rows) {
    lines.push(`${pad(r.name, w)} ${pad(r.origin, 5)} ${pad(r.blurb || "", 80)} ${(r.flags || []).join(" ")}`);
  }
  lines.push(``, `Open one with stashui_component("<name>"). Flags: pure = no npm deps,`);
  lines.push(`Nc = N hardcoded colours to replace, sized-parent = needs a sized wrapper,`);
  lines.push(`"N ports" = the same component exists in N libraries; compare them.`);
  return lines.join("\n");
}

// ------------------------------------------------------------------ layer 3
function renderComponent(name: string): string {
  const p = join(INDEX, "components", `${name}.json`);
  if (!existsSync(p)) {
    const near = suggest(name);
    return (
      `No component "${name}".` +
      (near.length ? `\n\nDid you mean:\n${near.map((n) => `  ${n}`).join("\n")}` : "") +
      `\n\nBrowse with stashui_categories, then stashui_category("<slug>").`
    );
  }
  const r = readJson(p);
  const t = r.traits ?? {};
  const L: string[] = [];
  L.push(`${r.title}${" ".repeat(Math.max(1, 56 - r.title.length))}${r.name}`);
  L.push(`${r.category} · ${r.origin}`);
  L.push(``, r.description || r.blurb || "(no description)", ``);
  if (r.use_when) L.push(`  USE WHEN     ${r.use_when}`);
  if (r.avoid_when) L.push(`  AVOID WHEN   ${r.avoid_when}`);
  if (r.a11y) L.push(`  A11Y         ${r.a11y}`);
  L.push(``);
  if (r.props?.length) {
    L.push(`PROPS`);
    const w = Math.max(...r.props.map((x: Prop) => x.name.length)) + 2;
    for (const x of r.props) {
      const d = x.required ? "required" : x.default != null ? String(x.default) : "—";
      L.push(`  ${pad(x.name, w)}${pad(x.type || "unknown", 26)}${d}`);
    }
  } else {
    L.push(`PROPS        none`);
  }
  L.push(``);
  L.push(`TRAITS       trigger ${(t.trigger || []).join("/")} · motion ${t.motion} · affects ${(t.affects || []).join("/")}`);
  L.push(`             tone ${t.tone} · theme ${t.theme} · sized parent ${t.needs_sized_parent ? "REQUIRED" : "not required"}`);
  if (r.slot_hints?.length) L.push(`SLOTS        ${r.slot_hints.join(", ")}`);
  L.push(`EXPORTS      ${(r.exports || []).join(", ") || "—"}`);
  L.push(`NPM DEPS     ${(r.npm_deps || []).join(", ") || "—"}`);
  L.push(`NEEDS        ${(r.registry_deps || []).join(", ") || "—"}`);
  L.push(`CSS          ${r.css ? "adds keyframes / CSS vars to globals.css" : "—"}`);
  L.push(`FRAMEWORKS   ${(r.frameworks || []).join(", ") || "react"}`);
  L.push(
    `RECOLOUR     ${
      r.hardcoded_colors
        ? `${r.hardcoded_colors} hardcoded colour${r.hardcoded_colors > 1 ? "s" : ""} to replace with tokens`
        : "clean — no hardcoded colours"
    }`,
  );
  if (r.alternatives?.length) {
    L.push(``, `ALTERNATIVES  the same component in other libraries, cheapest integration first`);
    for (const a of r.alternatives) {
      L.push(`  ${pad(a.name, 30)}${a.hardcoded_colors} colours, ${a.npm_deps} dep${a.npm_deps === 1 ? "" : "s"}  (${a.origin})`);
    }
  }
  if (r.usage) {
    L.push(``, `USAGE  (from its demo)`);
    for (const line of String(r.usage).split("\n").slice(0, 30)) L.push(`  ${line}`);
  }
  L.push(``, `INSTALL   ${r.install}`);
  L.push(`PREVIEW   ${r.preview}`);
  L.push(`CODE      stashui_code("${r.name}")  — only if you need to read the implementation`);
  return L.join("\n");
}

// ------------------------------------------------------------------ layer 4
function renderCode(name: string): string {
  if (!componentExists(name)) {
    const near = suggest(name);
    return `No component "${name}".${near.length ? ` Did you mean: ${near.join(", ")}` : ""}`;
  }
  const r = readJson(join(INDEX, "components", `${name}.json`));
  const f = join(REPO, r.file);
  if (!existsSync(f)) return `Source not found on disk for "${name}" (${r.file}).`;
  return `${r.file}\n\n${readFileSync(f, "utf8")}`;
}

function renderSlot(slot: string): string {
  const out: string[] = [];
  for (const slug of categoryList()) {
    const d = readJson(join(INDEX, "categories", `${slug}.json`));
    for (const r of d.components as Row[]) {
      if (r.slots?.includes(slot)) out.push(`${pad(r.name, 34)} ${pad(slug, 14)} ${pad(r.origin, 5)} ${r.blurb || ""}`);
    }
  }
  if (!out.length) return `Nothing is tagged for slot "${slot}".`;
  return `${out.length} components fit the "${slot}" slot, across categories:\n\n${out.join("\n")}`;
}

type Row = { name: string; title: string; origin: string; blurb: string; trigger?: string[]; tone?: string; slots?: string[]; flags?: string[] };
type Prop = { name: string; type: string; default: unknown; required: boolean };
type Filters = { trigger?: string; tone?: string; slot?: string; no_deps?: boolean; clean_only?: boolean };

// --------------------------------------------------------------------- wire
const server = new McpServer({ name: "stashui", version: "0.1.0" });

server.tool(
  "stashui_categories",
  "START HERE. Lists every component category in the StashUI registry with a description of what each one holds, the page slots it usually fills, and which categories overlap with it. Call this first to decide where to look; do not guess a category name.",
  {},
  async () => text(renderCategories()),
);

server.tool(
  "stashui_category",
  "Lists every component in one category, one line each: name, source library, what it looks like, and integration flags. This is the shortlisting layer. Optional filters narrow a large category before you read it — use them on categories with more than ~60 components.",
  {
    slug: z.string().describe(`Category slug from stashui_categories, e.g. "buttons".`),
    trigger: z.enum(["always", "hover", "click", "focus", "scroll", "viewport", "pointer-move", "drag", "timer", "keyboard"]).optional()
      .describe("Only components activated this way."),
    tone: z.enum(["minimal", "decorative", "playful", "technical", "dramatic"]).optional()
      .describe("Only components with this visual register. Match it to the design doc's mood."),
    slot: z.string().optional().describe(`Only components tagged for this page slot, e.g. "primary-cta".`),
    no_deps: z.boolean().optional().describe("Only components with zero npm dependencies."),
    clean_only: z.boolean().optional().describe("Only components with no hardcoded colours — these drop straight into your design tokens."),
  },
  async ({ slug, ...f }) => text(renderCategory(slug, f as Filters)),
);

server.tool(
  "stashui_component",
  "Everything about one component except its source: what it does, when to use it and when not to, its full prop table with defaults, dependencies, how many hardcoded colours you will have to replace, a usage example from its real demo, and the install command. Call this on the two or three candidates you shortlisted — not on every row.",
  { name: z.string().describe("Exact component name from a stashui_category listing.") },
  async ({ name }) => text(renderComponent(name)),
);

server.tool(
  "stashui_code",
  "The full source of one component. Only call this when you actually need to read the implementation — to check a specific behaviour, or before modifying it. stashui_component already gives you the props, the usage example and the install command, so you rarely need this to make a choice.",
  { name: z.string().describe("Exact component name.") },
  async ({ name }) => text(renderCode(name)),
);

server.tool(
  "stashui_slot",
  `Finds components for one page slot across every category — use this when you have a design doc's slot list and want candidates for a slot regardless of which category they live in. Slots: page-background, section-background, hero, headline, body-text, primary-cta, secondary-cta, nav, sidebar, footer, feature-card, pricing-card, testimonial, logo-wall, stat, form-field, form-submit, modal, toast, tooltip, badge, avatar, media, data-table, list-item, loading, empty-state, decoration, divider, chart.`,
  { slot: z.string().describe("One slot name from the list in this description.") },
  async ({ slot }) => text(renderSlot(slot)),
);

server.tool(
  "stashui_install",
  "Returns the single shadcn command that installs the given components into the current project. Run every component for one screen in ONE command — shadcn writes the files, merges keyframes and CSS variables into globals.css, and installs npm dependencies in one pass.",
  { names: z.array(z.string()).min(1).describe("Component names to install together.") },
  async ({ names }) => {
    const missing = names.filter((n) => !componentExists(n));
    if (missing.length) {
      return text(`Unknown component${missing.length > 1 ? "s" : ""}: ${missing.join(", ")}.\n` +
        missing.map((m) => `  ${m} -> did you mean: ${suggest(m).join(", ") || "(no near match)"}`).join("\n"));
    }
    const recs = names.map((n) => readJson(join(INDEX, "components", `${n}.json`)));
    const urls = recs.map((r) => String(r.install).split(" ").pop());

    // Vendored components import shadcn primitives and assume they already exist.
    // Emit them in the same command, or the installed code will not compile.
    // A dep is needed unless it is already being installed by name. Do NOT skip it
    // just because a StashUI component shares the slug — the import resolves to
    // components/ui/<name>, which shadcn init populates from its own registry.
    const known = new Set(names);
    const primitives = [...new Set(recs.flatMap((r) => r.registry_deps ?? []))]
      .filter((d: string) => !known.has(d))
      .sort();

    const parts = [...primitives, ...urls].join(" ");
    const colours = recs.filter((r) => r.hardcoded_colors > 0);
    const bill = colours.reduce((a, r) => a + r.hardcoded_colors, 0);

    return text(
      `Run this from the project root:\n\n  npx shadcn@latest add ${parts}\n\n` +
        (primitives.length
          ? `Includes ${primitives.length} shadcn primitive${primitives.length > 1 ? "s" : ""} ` +
            `(${primitives.join(", ")}) that these components import — without them the ` +
            `installed files will not compile.\n\n`
          : "") +
        (bill
          ? `Then replace ${bill} hardcoded colour${bill > 1 ? "s" : ""} across ` +
            `${colours.length} of these files with your design tokens ` +
            `(${colours.map((r) => `${r.name}: ${r.hardcoded_colors}`).join(", ")}). ` +
            `That step is what stops the page looking like a scrapbook.`
          : `None of these carry hardcoded colours — they drop straight into your tokens.`),
    );
  },
);

await server.connect(new StdioServerTransport());
