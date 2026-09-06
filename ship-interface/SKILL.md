---
name: ship-interface
description: Ship a complete interface end to end from the StashUI design system — grill the user into a design doc, derive the slot list, navigate the StashUI MCP server to pick a component per slot, install them, recolour everything to the doc's tokens, and verify in a browser. Use for any real frontend build: a landing page, dashboard, marketing site, app screen, onboarding flow, or a redesign of an existing one. Also use whenever the user says "build me a UI", "ship this page", "use my design system", "use my component library", or complains that UI looks AI-generated or templated.
---

# ship-interface

Two halves make an interface: the **design doc** that says what it should look
like, and the **registry** of 1518 components to build it from.

Neither works alone. The registry without a doc produces a scrapbook — every
component wearing its own demo's colours, four accent hues by the third section.
The doc without the registry produces hand-written components that are a worse
version of work already done, and burns a context window doing it.

## The registry is reached through MCP

Six tools, four layers. Each answers one question and costs only what that
question needs.

| Tool | Answers | Cost |
| --- | --- | --- |
| `stashui_categories` | which category? | ~1.1k tokens |
| `stashui_category(slug, …filters)` | which components? | ~350 – 4.8k tokens |
| `stashui_component(name)` | is this the one? | ~300 tokens |
| `stashui_code(name)` | how is it built? | on request only |
| `stashui_slot(slot)` | what fits this slot, across categories? | varies |
| `stashui_install(names[])` | one command for the whole screen | tiny |

**Never skip a layer.** `stashui_component` on twenty candidates costs more than
`stashui_category` on all ninety-seven. And never call `stashui_code` to choose —
`stashui_component` already gives you props, defaults, dependencies, the recolour
cost and a working usage example. Read code only to check a specific behaviour or
before modifying a component.

---

## Phase 1 — Design doc

If `design.tokens.json` exists and `--check` passes, read it and move on.
Otherwise run **design-grill**: one question at a time, `AskUserQuestion` with
concrete options, eight questions maximum.

```bash
python3 design-grill/scripts/scaffold_design_doc.py --project "Name"
python3 design-grill/scripts/scaffold_design_doc.py --check
python3 design-grill/scripts/scaffold_design_doc.py --sync
```

Paste `design.tokens.css` into `globals.css` **before installing anything**.
Components pick the shadcn variables up on arrival, which roughly halves phase 5.

## Phase 2 — Slots

One row per piece the screen actually needs, each with what it must do and any
hard constraint:

| Slot | Needs | Constraint |
| --- | --- | --- |
| page background | quiet, doesn't compete with the table | no WebGL, must not animate |
| primary CTA | one unmistakable action | works on touch |
| feature cards | three, equal weight | works at 320px |

This list is the join between the doc and the registry. Navigate against it and
you pull what the page needs; navigate without it and you pull what looked nice.

## Phase 3 — Navigate, one slot at a time

```
stashui_categories()                    → once. map slots to categories.
stashui_category("buttons",             → filter BEFORE you read
                 trigger="hover",
                 tone="minimal",
                 clean_only=true)
stashui_component("magnetic-button")    → the two or three that survived
```

**Filter first.** The filters are the difference between reading 97 rows and
reading 6:

- `tone` — match the design doc's mood. A `dramatic` component in a `calm`
  product is wrong however good it looks.
- `trigger` — `hover` is dead on touch; `scroll` needs a scrollable page.
- `clean_only` — components with zero hardcoded colours drop straight into your
  tokens. About half the registry qualifies.
- `no_deps` — fewer npm dependencies, fewer install-time surprises.

When your slot list crosses categories, go at it from the slot instead:
`stashui_slot("primary-cta")`.

**Pick on evidence, not on the demo.** A demo is styled to sell the component.
What matters is whether it survives being recoloured. Compare on props, deps and
`RECOLOUR`. Prefer fewer dependencies when two are close.

**When a component has `ALTERNATIVES`, read them.** 192 components in this
registry are the same thing ported by several libraries. Prose cannot separate
those — integration cost can, and `stashui_component` ranks them for you. Take
the cheapest unless you have a reason.

**When `sized-parent` is flagged**, the component collapses to zero height unless
you wrap it: `<div className="relative h-[560px] w-full overflow-hidden">`. This
is the single most common way a correct install renders as a blank screen.

If three lookups across two categories turn up nothing that fits, say so plainly,
name the calls you made, and hand-write that one piece. A gap in the registry is
worth knowing about; a silent workaround is not.

## Phase 4 — Install

One call for the whole screen, from the project root:

```
stashui_install(["aurora-background", "shimmer-button", "bento-grid"])
```

`shadcn` writes them into `components/ui/`, merges keyframes and CSS variables
into `globals.css`, and installs npm deps in one pass.

## Phase 5 — Recolour and compose

The step that decides whether this reads as one product.

Installed components arrive wearing their demo's palette. `stashui_component`
told you exactly how many hardcoded colours each one carries — go replace that
many. Hold these across the whole build:

- **One accent hue.** Semantic colours are not accents.
- **One radius**, one spacing base unit, one type scale.
- **One motion character.** If the hero eases slowly, the buttons don't snap.
- **Colours come from tokens.** A hardcoded hex in a component file is a future
  inconsistency — fix it when you see it, not later.

What you write yourself: layout, composition, routing, state, data flow, copy.
The registry supplies pieces; assembling them into *this* product is the job.

## Phase 6 — Verify

"It compiles" is not evidence that it looks right.

```bash
npm run dev
```

Screenshot it with the `agent-browser` skill, or ask the user to look. Check the
states that get skipped: empty, loading, error, a 60-character name, a 320px
viewport, and the other colour mode. Then re-read `DESIGN.md` and check the build
against it — if you deviated, either change it back or amend the doc with why.

---

## How much to decide yourself

Decide and proceed. Research the domain, choose the palette, pick the components,
resolve ambiguity with a stated assumption, keep building. Report the palette and
the reasoning in a line or two when you present the work, so the choice can be
challenged after the fact rather than blocking before it.

Interrupt only for what is genuinely the user's to give and unrecoverable if you
guess wrong: brand constraints you cannot know, product decisions disguised as
design ones (what the primary action on this screen actually *is*), and anything
destructive.
