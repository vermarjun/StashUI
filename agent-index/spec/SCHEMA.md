# Index schema — what each layer hands the agent

The contract between the registry and any agent consuming it. One record per
component, projected four ways. The MCP server renders these; nothing invents a
field.

## Principles

1. **Each layer answers exactly one question** and costs only what that question needs.
2. **Nothing an agent pastes into code comes from a model unchecked.** Props are
   verified against source, defaults are read by regex, usage comes from the real demo.
3. **Generated output is stored twice.** `raw/<name>.json` is the model's verbatim
   response and is never edited; `records.enriched.jsonl` is a validated projection.
   Changing truncation, vocabulary or verification rules is a re-run of
   `merge_records.py` and costs nothing.
4. **Nothing generated mentions a category.** Moving a component between categories
   is one line in `registry/categories.json` plus a rebuild — no regeneration.

---

## The record

```jsonc
{
  // identity — mechanical
  "name": "magnetic-button", "title": "Magnetic Button",
  "category": "buttons",                   // from a sidecar, never from the model
  "origin": "Aceternity UI", "origin_short": "ace",

  // prose — generated, validated
  "blurb":       "Leans toward the cursor, springs back on release.",   // ≤80
  "description": "Wraps a child and translates it toward the pointer…", // ≤240
  "use_when":    "One hero CTA that should feel physical…",             // ≤120
  "avoid_when":  "Dense toolbars, or touch-only surfaces…",             // ≤120
  "a11y":        "Wrapper only; focus comes from the child. No prefers-reduced-motion guard.",

  // API surface — names generated then verified in source, defaults read by regex
  "exports": ["MagneticButton"],
  "props": [
    {"name":"strength","type":"number","default":"0.8","required":false}
  ],

  // filtering — fixed vocabularies, coerced at merge
  "traits": {
    "trigger": ["pointer-move"],   // always|hover|click|focus|scroll|viewport|
                                   // pointer-move|drag|timer|keyboard
    "motion": "subtle",            // none|subtle|pronounced|continuous
    "affects": ["children"],       // fill|border|text|shadow|background|layout|
                                   // cursor|children|image
    "tone": "minimal",             // minimal|decorative|playful|technical|dramatic
    "theme": "both",               // light|dark|both
    "needs_sized_parent": false    // collapses to 0 height without a sized wrapper
  },
  "slot_hints": ["primary-cta", "secondary-cta"],   // 30-value fixed list

  // integration cost — mechanical
  "npm_deps": ["motion"], "registry_deps": [], "css": false,
  "frameworks": ["react", "next"],
  "hardcoded_colors": 0,                   // the recolour bill
  "flags": ["motion"],
  "dupe_group": null,                      // set when several libraries ship this
  "alternatives": [],                      // ranked by (deps, colours) ascending

  // usage — the component's real .demo.tsx, imports rewritten to the consumer path
  "usage": "import { MagneticButton } from \"@/components/ui/magnetic-button\";\n…",
  "usage_source": "demo",

  "file": "registry/aceternity-ui/magnetic-button.tsx",
  "install": "npx shadcn@latest add https://stashui.vercel.app/r/magnetic-button.json",
  "preview": "https://stashui.vercel.app/c/magnetic-button"
}
```

`hardcoded_colors` is the field Blade doesn't need and this does. Blade owns its 89
components and enforces tokens in the type system; this vendors 1518 it does not own,
so the recolour cost is measured per component instead — and it is the same scan that
enforcement will run post-install.

---

## Layer 1 — `stashui_categories()` — 6.9 KB, ~1,750 tokens

**Which category?** 31 categories, each with what it actually holds (written from the
component blurbs, not from the category name), the slots its components usually fill,
and which categories overlap.

```
buttons           97  Buttons and CTAs from plain variants through gradient, shimmer,
                      metal, beam and animated treatments.
                      slots: secondary-cta, primary-cta, form-submit, nav
                      see also: borders, effects
```

`see also` resolves genuinely ambiguous routing — a magnetic hover treatment could
be `buttons` or `effects`, so both say so.

## Layer 2 — `stashui_category(slug, …filters)` — 350 to 4,800 tokens

**Which component?** Every component in the category, one row each. No family layer:
the largest category renders in 4,800 tokens, so an interior level would only add a
hop. (v1 had one; 73% of its nodes were buckets named after the source library, which
is provenance, not meaning. It was measured and removed.)

```
NAME                  ORIG  BLURB                                              FLAGS
btn-hover-down        uila  Shadow lifts on hover; button translates toward…   pure 6c
shimmer-button        own   Light sweeps diagonally across the face on a loop. pure 5c 3 ports
```

**Filters run before the model reads anything** — `trigger`, `tone`, `slot`,
`no_deps`, `clean_only`. `stashui_category("buttons", trigger="hover", clean_only=true)`
is 356 tokens against 2,800 unfiltered. This is how a component is chosen among 97.

Flags: `pure` (no npm deps), `motion`, `webgl`, `canvas`, `3d`, `heavy` (≥3 deps),
`sized-parent`, `Nc` (N colours to replace), `N ports` (exists in N libraries).

## Layer 3 — `stashui_component(name)` — ~430 tokens

**Is this the one?** Description, `USE WHEN` / `AVOID WHEN` / `A11Y`, the prop table
with defaults, traits, slots, dependencies, the recolour bill, `ALTERNATIVES` ranked
by integration cost, a working usage example, and the install command.

`ALTERNATIVES` exists because 192 components here are the same thing ported by several
libraries. Prose cannot separate those; integration cost can.

## Layer 4 — `stashui_code(name)` — on request only

**How is it built?** Raw source. Never returned as part of choosing.

---

## Field ownership

| Field | Source | Check |
| --- | --- | --- |
| name, title, category, origin, file, install, preview | registry + sidecars | — |
| exports | regex over source | — |
| npm_deps, registry_deps, css | registry.json | — |
| frameworks | import scan | — |
| hardcoded_colors, flags | colour scan | — |
| dupe_group, alternatives | normalised title, sorted by (deps, colours) | — |
| usage | the real `.demo.tsx` | imports rewritten to `@/components/ui/…` |
| **prop names / types** | **generated** | must appear verbatim in the source |
| **prop defaults** | **regex over the destructured parameter list** | — |
| **blurb / description / use_when / avoid_when / a11y** | **generated** | length-capped; blurb must not restate the title or name the library |
| **traits, slot_hints** | **generated** | coerced to the fixed vocabularies; unknown values dropped |

## What the checks caught on the first run

| | |
| --- | --- |
| Invented prop names rejected | **107** |
| Defaults recovered by regex that the model missed | **682** |
| Fields clipped to length | 276 |
| Empty blurbs in the final set | **0** |

The defaults case is the instructive one: a TypeScript interface carries the type and
optionality but never the default, so a model reads the type block and stops. The
defaults sit in the destructured parameter list, often 150+ lines further down. That
is a regex's job, not a model's.

---

## Pipeline

```bash
python3 agent-index/scripts/extract_records.py   # mechanical fields    -> records.base.jsonl
python3 agent-index/scripts/make_shards.py       # byte-budgeted shards -> spec/shards/
#   generation: one Haiku agent per shard, spec/PROMPT.md is the contract
python3 agent-index/scripts/validate_raw.py      # contract check, names what to repair
python3 agent-index/scripts/merge_records.py     # raw + mechanical     -> records.enriched.jsonl
python3 agent-index/scripts/build_index.py       #                      -> agent-index/index/
```

Shards are packed by **source bytes**, not component count, so no shard can overflow a
context window however file sizes fall, and sorted by category so each agent
differentiates components against their real siblings.
