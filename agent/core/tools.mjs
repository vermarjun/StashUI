// The six operations. Each returns text and, for the four visual ones, a sheet
// spec. The text is the legend for the image: numbers, names, and the two things
// a still cannot show (what it does, what it costs to adopt).
//
// These definitions are the single source for the MCP tool list, the HTTP API
// and the CLI, so the three doors can never disagree.
import { catalog, detail, nearest, registryItem } from "./catalog.mjs";
import { AVOID, HUES, rank, shortlist } from "./search.mjs";
import { meaning, similar } from "./semantic.mjs";
import { columnsFor, sheetTokens } from "./sheet.mjs";

const PAGE = 12, DENSE = 20, MAX_RESULTS = 48;

const context = {
  theme: { type: "string", enum: ["dark", "light"], description: "The project's theme. Ranks matching components first." },
  accent: { type: "string", enum: HUES, description: "The project's accent hue. Ranks components already in that hue first." },
  avoid: {
    type: "array", items: { type: "string", enum: Object.keys(AVOID) },
    description: `Hard limits. Each drops what breaks it: ${Object.entries(AVOID).map(([k, v]) => `${k} (${v.says})`).join("; ")}.`,
  },
};

// What a still cannot show and an agent must know before choosing: the cost to adopt, and anything wrong.
const warnings = (it) => [
  it.content === "hardcoded" && "copy in file",
  it.weight === "heavy" && "heavy",
  it.unresolved && "install gap",
  it.render && `recording ${it.render}`,
].filter(Boolean);
const cost = (it) => [it.trigger?.join("/") || "static", `${it.deps} deps`, `${it.colours} colours`, ...warnings(it), `q${it.quality}`].join(" · ");
const row = (n, it, pad) => `${String(n).padStart(2)}  ${it.name.padEnd(pad)}  ${it.kind.padEnd(18)} ${it.blurb}  (${cost(it)})`;
const COST_KEY = "(trigger · npm deps · hardcoded colours to replace · warnings, if any · human quality score 1-5)";

function unknown(name) {
  return { text: `No component named "${name}". Closest: ${nearest(name).join(", ")}. Names come from search or browse.`, isError: true };
}

export const TOOLS = {
  search: {
    description:
      "Find components and SEE them. Returns one image: a numbered grid of the best matches, plus one line per number. " +
      "Describe the piece in plain words: what it is, what it does, how it should look. It is matched by meaning, not only by keywords. " +
      "Pass `kind` when you know what it is. Judge by the image first, then the cost in the text.",
    input: {
      type: "object",
      required: ["query"],
      properties: {
        query: { type: "string", description: "The piece in plain words, e.g. \"header with links and a sign-up button\" or \"box you open with ctrl k to jump anywhere\"." },
        kind: { type: "string", description: "What it is. One id from `browse` with no arguments, e.g. site-header, hero, pricing-section, button. Results are then only that kind." },
        ...context,
        clean: { type: "boolean", description: "Only components with no hardcoded colours: they take your tokens untouched." },
        like: { type: "string", description: "A component name you have already chosen. Ranks what looks and reads like it first, to keep a page consistent." },
        page: { type: "integer", minimum: 1, description: "Results page. Ask for 2 only when page 1 has fewer than two candidates." },
        dense: { type: "boolean", description: "20 per sheet instead of 12. Only for small things: buttons, inputs, badges." },
      },
    },
    run(a) {
      const cat = catalog();
      if (a.kind && !cat.kindById.has(a.kind)) return { text: `Unknown kind "${a.kind}". Call browse with no arguments for the list.`, isError: true };
      if (a.like && !cat.byName.has(a.like)) return unknown(a.like);
      const unknownLimit = (a.avoid || []).find((x) => !AVOID[x]);
      if (unknownLimit) return { text: `Unknown limit "${unknownLimit}" in avoid. Limits: ${Object.keys(AVOID).join(", ")}.`, isError: true };
      const r = rank({ ...a, likeSim: a.like ? similar(a.like) : null });
      // An exact kind or a model component is the agent's own constraint: everything that satisfies it is a match.
      // A plain description is cut to what really matches, so the count is honest and page two is not padding.
      const { names: matches, weak } = a.kind || a.like ? { names: r.names, weak: false } : shortlist(r);
      const per = a.dense ? DENSE : PAGE, page = Math.max(1, a.page || 1);
      const all = matches.slice(0, MAX_RESULTS), names = all.slice((page - 1) * per, page * per);
      const notes = [
        a.kind ? `kind ${a.kind}` : r.kinds.length ? `read as ${r.kinds.join(" or ")}` : null,
        a.like && `like ${a.like}`,
        a.avoid?.length && `avoiding ${a.avoid.join(", ")}`,
        a.clean && "no hardcoded colours",
      ].filter(Boolean).map((n) => ` · ${n}`).join("");
      if (!names.length) {
        return { text: `search "${a.query}"${notes}: no ${page > 1 ? "more " : ""}matches. Describe it differently, or drop a filter. ` +
          `After two rephrases treat it as a gap in the catalogue and build that piece yourself.` };
      }
      const items = names.map((n) => cat.byName.get(n)), pad = Math.max(...names.map((n) => n.length)), from = (page - 1) * per;
      const pages = Math.ceil(all.length / per);
      const count = weak ? `no close match, ${all.length} nearest shown` : `${matches.length > all.length ? `best ${all.length} of ${matches.length}` : all.length} match${all.length === 1 && matches.length === 1 ? "" : "es"}`;
      return {
        text: [
          `search "${a.query}"${notes} · ${count} · page ${page} of ${pages}`,
          ...items.map((it, i) => row(from + i + 1, it, pad)),
          COST_KEY,
          weak
            ? "Nothing matches this well; these are only the nearest. Describe it differently or pass `kind`. If a second try is no better, it is a gap: build that piece yourself."
            : `Before choosing: view your top two.${page < pages ? ` More: page ${page + 1}.` : ""}`,
        ].join("\n"),
        sheet: { cols: columnsFor(names.length), cells: items.map((it, i) => ({ name: it.name, badge: String(from + i + 1) })) },
      };
    },
  },

  browse: {
    description:
      "See what the catalogue holds. With no arguments: the list of kinds and how many of each (text only). " +
      "With up to 4 kinds: one image, a row per kind showing its five best. Use it to plan a page before searching.",
    input: {
      type: "object",
      properties: {
        kinds: { type: "array", maxItems: 4, items: { type: "string" }, description: "Up to 4 kind ids, in page order." },
        ...context,
      },
    },
    run(a) {
      const cat = catalog();
      if (!a.kinds?.length) {
        const by = (scale) => cat.kinds.filter((k) => k.scale === scale).map((k) => `${k.id} ${k.count}`).join(" · ");
        return {
          text: [
            `${cat.items.length} components. Kinds, with counts:`,
            `sections (full-width page parts): ${by("section")}`,
            `blocks (self-contained UI): ${by("block")}`,
            `elements (single controls): ${by("element")}`,
            `effects (visual treatments): ${by("effect")}`,
            `Pass up to 4 of these to browse, or one as \`kind\` to search.`,
          ].join("\n"),
        };
      }
      const bad = a.kinds.find((k) => !cat.kindById.has(k));
      if (bad) return { text: `Unknown kind "${bad}". Call browse with no arguments for the list.`, isError: true };
      const unknownLimit = (a.avoid || []).find((x) => !AVOID[x]);
      if (unknownLimit) return { text: `Unknown limit "${unknownLimit}" in avoid. Limits: ${Object.keys(AVOID).join(", ")}.`, isError: true };
      const lines = [], cells = [];
      for (const kind of a.kinds.slice(0, 4)) {
        const r = rank({ ...a, kind, query: "" });
        const top = r.names.slice(0, 5).map((n) => cat.byName.get(n));
        lines.push(`${kind} · ${cat.kindById.get(kind).count} in catalogue${top.length < 3 ? " · thin: expect to build part of this yourself" : ""}`);
        const pad = Math.max(0, ...top.map((it) => it.name.length));
        for (let i = 0; i < 5; i++) {                              // keep rows aligned: one row per kind, five cells wide
          const it = top[i];
          if (it) lines.push(row(cells.length + 1, it, pad));
          cells.push(it ? { name: it.name, badge: String(cells.length + 1) } : { name: "", badge: "-", caption: `no more ${kind}` });
        }
      }
      return {
        text: [...lines, COST_KEY, "A row with nothing right needs a search for that kind."].join("\n"),
        sheet: { cols: 5, cells },
      };
    },
  },

  view: {
    description:
      "Look at one component closely before choosing it. Returns one image of six frames from its recorded interaction, " +
      "so you can see what it does over time, plus its props, dependencies and what it costs to adopt.",
    input: { type: "object", required: ["name"], properties: { name: { type: "string" } } },
    run(a) {
      const it = catalog().byName.get(a.name), d = detail(a.name);
      if (!it || !d) return unknown(a.name);
      const times = it.film || [];
      const props = d.props.slice(0, 10).map((p) => `  ${p.name}${p.required ? "" : "?"}: ${p.type}${p.default != null ? ` = ${p.default}` : ""}`);
      // what the six frames are worth, from the pass that looked at them
      const f = d.frames, skip = f ? [1, 2, 3, 4, 5, 6].filter((n) => !f.usable.includes(n)) : [];
      const framesNote = !times.length ? `No recording for this component yet: judge it from the live page ${d.live}` : [
        `Frames 1-6 are ${times.map((t) => `${t}s`).join(", ")} into its recorded interaction.`,
        f?.best && `Frame ${f.best} shows it best.`,
        skip.length && skip.length < 6 && `Ignore frame${skip.length > 1 ? "s" : ""} ${skip.join(", ")} (mid-transition or empty).`,
        f?.shows === "no" && "The recording does not show the interaction: rely on \"What it does\".",
        f?.shows === "partly" && "The recording shows only part of the interaction: read \"What it does\" too.",
        f && f.render !== "ok" && `The recording is ${f.render}${f.note ? ` (${f.note})` : ""}: open the live page ${d.live} before choosing it.`,
      ].filter(Boolean).join(" ");
      return {
        text: [
          `${d.name} · ${d.title} · ${it.kind} · ${d.origin} · q${it.quality}`,
          d.description,
          d.looks && `Looks: ${d.looks}`,
          d.behaves && `What it does: ${d.behaves}`,
          d.use && `Use when: ${d.use}`,
          d.avoid && `Avoid when: ${d.avoid}`,
          d.suits?.length && `Suits: ${d.suits.join(", ")}${d.polish ? ` · finish ${d.polish}/5: ${d.polishWhy}` : ""}`,
          d.issues?.length && `Known issues: ${d.issues.slice(0, 3).join(" ")}`,
          d.parts?.length && `Parts: ${d.parts.join(", ")}${d.states?.length ? ` · states: ${d.states.join(", ")}` : ""}`,
          d.a11y && `Accessibility: ${d.a11y}`,
          d.content && `Your content goes in through: ${d.content === "hardcoded" ? "nothing, it is hardcoded: edit the file" : d.content}. ${d.customise || ""}`,
          d.demo && `Demo content to replace: ${d.demo}`,
          d.weight && `Runtime weight: ${d.weight}${d.responsive && d.responsive !== "unknown" ? ` · layout: ${d.responsive}` : ""}`,
          `Footprint ${it.size ? `${it.size[0]}x${it.size[1]}px in a 1120x700 stage` : "unmeasured"} · trigger ${it.trigger?.join("/") || "none"}` +
            `${it.accents?.length ? ` · demo colours: ${it.accents.join(", ")}` : " · demo is monochrome"}`,
          `Cost: ${d.npm.length ? `npm ${d.npm.join(", ")}` : "no npm deps"}${d.registry.length ? ` · shadcn ${d.registry.join(", ")}` : ""}` +
            ` · ${d.colours} hardcoded colours to replace with tokens`,
          d.unresolved.length && `Install gap: it imports ${d.unresolved.join(", ")}, which the install does not provide. You will have to write or replace that.`,
          d.sizedParent && `Needs a sized parent or it renders at zero height: <div className="relative h-[560px] w-full overflow-hidden">`,
          d.alternatives.length && `Same idea, other ports: ${d.alternatives.join(", ")}`,
          props.length ? `Props:\n${props.join("\n")}` : `Exports: ${d.exports.join(", ") || "default"} (no documented props)`,
          `Usage, from its demo (adjust import paths to where the file lands):\n${d.usage.split("\n").slice(0, 28).join("\n")}`,
          framesNote,
        ].filter(Boolean).join("\n"),
        sheet: times.length ? { cols: 3, cells: times.map((t, k) => ({ name: d.name, film: k, badge: String(k + 1), caption: `${d.name} at ${t}s` })) } : undefined,
      };
    },
  },

  board: {
    description:
      "See 2 to 12 components together at large size: your picks for a page, in order, or a few candidates side by side. " +
      "Use it before proposing a page, to check the picks look like one product.",
    input: {
      type: "object",
      required: ["names"],
      properties: {
        names: { type: "array", minItems: 2, maxItems: 12, items: { type: "string" }, description: "Component names, in page order." },
        labels: { type: "array", items: { type: "string" }, description: "What each one is for, e.g. header, hero, pricing. Same order as names." },
      },
    },
    run(a) {
      const cat = catalog();
      const missing = (a.names || []).find((n) => !cat.byName.has(n));
      if (missing) return unknown(missing);
      const items = a.names.map((n) => cat.byName.get(n)), pad = Math.max(...a.names.map((n) => n.length));
      const hues = [...new Set(items.flatMap((it) => it.accents || []))];
      return {
        text: [
          `board · ${items.length} components`,
          ...items.map((it, i) => `${String(i + 1).padStart(2)}  ${(a.labels?.[i] || it.kind).padEnd(16)} ${it.name.padEnd(pad)}  ${it.accents?.length ? it.accents.join("/") : "mono"} · ${it.colours} colours to replace`),
          `Accent hues across the board: ${hues.length ? hues.join(", ") : "none (all monochrome)"}.` +
            (hues.length > 1 ? " More than one hue: the page will not look like one product until they are recoloured to your tokens, or the odd one is replaced." : ""),
        ].join("\n"),
        sheet: { cols: columnsFor(items.length), cells: items.map((it, i) => ({ name: it.name, badge: String(i + 1), caption: `${a.labels?.[i] || it.kind} / ${it.name}` })) },
      };
    },
  },

  code: {
    description: "The source of one component. Call it only for a component you are about to modify; choosing never needs it.",
    input: { type: "object", required: ["name"], properties: { name: { type: "string" } } },
    run(a) {
      const item = registryItem(a.name);
      if (!item) return unknown(a.name);
      return { text: item.files.map((f) => `// ${f.path}\n${f.content}`).join("\n\n") };
    },
  },

  add: {
    description: "The one command that installs the chosen components into a shadcn project, with what each needs afterwards.",
    input: { type: "object", required: ["names"], properties: { names: { type: "array", minItems: 1, maxItems: 20, items: { type: "string" } } } },
    run(a) {
      const cat = catalog();
      const missing = (a.names || []).find((n) => !cat.byName.has(n));
      if (missing) return unknown(missing);
      const ds = a.names.map((n) => detail(n));
      // shadcn primitives go in the command by name: registry items often fail to declare them
      const primitives = [...new Set(ds.flatMap((d) => d.registry))].sort();
      const command = ["npx", "shadcn@latest", "add", ...primitives, ...ds.map((d) => d.registryItem)];
      const notes = ds.flatMap((d) => [
        d.unresolved.length ? `${d.name}: imports ${d.unresolved.join(", ")}, which is NOT installed. Write that file or replace the import, or it will not compile` : null,
        d.colours ? `${d.name}: ${d.colours} hardcoded colours to replace with your tokens (delete any demo code in the file first; some of them live there)` : null,
        d.sizedParent ? `${d.name}: wrap in a sized parent (relative h-[560px] w-full overflow-hidden)` : null,
      ]).filter(Boolean);
      return {
        text: [
          command.join(" "),
          `Writes ${ds.map((d) => d.file).join(", ")}${primitives.length ? `, plus the shadcn primitives ${primitives.join(", ")}` : ""}; npm dependencies install with it.`,
          ...(notes.length ? ["After install:", ...notes.map((n) => `  ${n}`)] : ["Nothing to fix after install: these take your tokens as they are."]),
          "Then run your type check before going on.",
        ].join("\n"),
        data: { command, primitives },
      };
    },
  },
};

/**
 * `call` with meaning search switched on. Embedding a query is async, so the doors (HTTP, MCP) use this;
 * `call` itself stays synchronous and matches on words only, which is also what happens when the model
 * cannot load. Either way the answer has the same shape.
 */
export async function callWithMeaning(name, args) {
  if (name === "search" && args?.query) {
    const sem = await meaning(args.query).catch(() => null);
    if (sem) return call(name, { ...args, sem });
  }
  return call(name, args);
}

export function call(name, args) {
  const tool = TOOLS[name];
  if (!tool) return { text: `Unknown operation "${name}". Operations: ${Object.keys(TOOLS).join(", ")}.`, isError: true };
  const missing = (tool.input.required || []).find((k) => args?.[k] == null || args[k] === "");
  if (missing) return { text: `${name} needs \`${missing}\`.`, isError: true };
  const out = tool.run(args || {});
  if (out.sheet) out.tokens = sheetTokens(out.sheet.cells.length, out.sheet.cols);
  return out;
}
