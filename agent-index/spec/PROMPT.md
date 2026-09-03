# Component metadata generation — the contract

You are writing metadata for a machine-readable component index. Coding agents
navigate this index to pick a component for a slot in a page they are building.
They see your `blurb` in a list of ~90 siblings, and your `description`,
`use_when` and `avoid_when` when they open one. Write for that reader.

## The loop

You are given a shard file listing components. For **each** component, in order:

1. Read its `file` (the component source).
2. Read its `demo` (usage example) if the path exists.
3. Write **one JSON file** to `agent-index/spec/raw/<name>.json`.

Do them one at a time. Do not batch reads. Do not stop early. Do not summarise
your progress between components — just work through the list.

When every component in the shard has a file on disk, reply with exactly one line:

```
done <shard_id> <count written>
```

Do not print the metadata in your reply. It goes to disk, nowhere else.

## Output contract

`agent-index/spec/raw/<name>.json`, exactly these keys, nothing extra:

```json
{
  "name": "magnetic-button",
  "blurb": "Leans toward the cursor, springs back on release.",
  "description": "Wraps a child and translates it toward the pointer within a radius, easing back to rest when the pointer leaves. Spring-based, no layout shift.",
  "use_when": "One hero CTA that should feel physical without moving its neighbours.",
  "avoid_when": "Dense toolbars, or touch-only surfaces — there is no pointer to track.",
  "a11y": "Wrapper only; focus and keyboard behaviour come from the child. No prefers-reduced-motion guard.",
  "props": [
    {"name": "children", "type": "React.ReactNode", "default": null, "required": true},
    {"name": "strength", "type": "number", "default": "0.8", "required": false},
    {"name": "maxDistance", "type": "number", "default": "100", "required": false}
  ],
  "traits": {
    "trigger": ["pointer-move"],
    "motion": "subtle",
    "affects": ["children"],
    "tone": "minimal",
    "theme": "both",
    "needs_sized_parent": false
  },
  "slot_hints": ["primary-cta", "secondary-cta"]
}
```

## Fields

**`blurb`** — at most 80 characters. What it LOOKS LIKE or DOES on screen, as a
person would describe it out loud. This is the single line that distinguishes it
from 90 siblings, so make it distinguishing.

- Never restate the title. For "Magnetic Button", never "A magnetic button".
- Never name the source library.
- Never say "a component that" or "this component".
- Lead with the verb or the visual, not the noun.

| | |
|---|---|
| ✅ | `Leans toward the cursor, springs back on release.` |
| ✅ | `Light sweeps diagonally across the face on a loop.` |
| ✅ | `Gradient traces the perimeter continuously.` |
| ❌ | `A button component with a magnetic hover animation.` |
| ❌ | `Magnetic Button from Aceternity UI.` |
| ❌ | `An animated button.` |

**`description`** — one or two sentences, at most 240 characters. What it renders
and what drives it (pointer, scroll, timer, state, CSS-only). Mention a real
mechanism you can see in the code.

**`use_when`** — at most 120 characters. The concrete situation where this is the
right pick over a plainer alternative.

**`avoid_when`** — at most 120 characters. A real limitation visible in the code:
touch devices, contrast, layout cost, a RAF loop that never idles, a required
parent size, a fixed colour that fights a theme. Never write "when you don't need
animation" — that is true of everything and helps nobody.

**`a11y`** — one sentence. Keyboard reachability, focus handling, aria, and
whether motion respects `prefers-reduced-motion`. If the component is a passive
wrapper, say so. Be factual about what the code does, not what it should do.

**`props`** — the props the component actually accepts, read from the source.
Exact identifier spelling from the code. Type as written. `required: true` only
when the code cannot work without it.

**Defaults are not in the type block.** A TypeScript interface tells you the type
and whether a prop is optional; it never holds the default. Defaults live in the
destructured parameter list of the component function, which is often 150+ lines
further down the file. Scroll to it and read it:

```tsx
type Props = { speed?: number; streakCount?: number };   // ← types only, no defaults

export const Lightfall = ({
  paused = false,           // ← the defaults are HERE
  speed = 0.5,
  streakCount = 2,
}: Props) => {
```

Report `"default": "0.5"` for `speed`, not `null`. Use `null` only when the
destructuring genuinely gives no default.
**Never invent a prop** — every name is checked against the source and a name that
does not appear there is discarded.

If the component takes no props, return `[]`.

**`traits`** — fixed vocabularies. Use only these values.

| Key | Values | Notes |
|---|---|---|
| `trigger` | `always` `hover` `click` `focus` `scroll` `viewport` `pointer-move` `drag` `timer` `keyboard` | list, 1–3. `always` = runs unprompted. |
| `motion` | `none` `subtle` `pronounced` `continuous` | one. `continuous` = never settles. |
| `affects` | `fill` `border` `text` `shadow` `background` `layout` `cursor` `children` `image` | list, 1–3. What visibly changes. |
| `tone` | `minimal` `decorative` `playful` `technical` `dramatic` | one. |
| `theme` | `light` `dark` `both` | one. `both` unless the code hardcodes for one. |
| `needs_sized_parent` | `true` `false` | `true` when the root is `absolute`/`fixed`/a canvas/WebGL and collapses to zero height without a sized parent. Check this carefully — it is a common breakage. |

**`slot_hints`** — 1 to 4 values, only from this list. Where on a page this piece
goes. It is fine for a component to fit several.

```
page-background  section-background  hero        headline      body-text
primary-cta      secondary-cta       nav         sidebar       footer
feature-card     pricing-card        testimonial logo-wall     stat
form-field       form-submit         modal       toast         tooltip
badge            avatar              media       data-table    list-item
loading          empty-state         decoration  divider       chart
```

## Standing rules

- **Describe the component, never the taxonomy.** Do not mention its category,
  the index, other components, or how many siblings it has. Categories change;
  this metadata must not go stale when one does.
- **Read the source before writing.** Everything you assert must be visible in
  the code you just read.
- **Never write an empty `blurb`, `description`, `use_when`, `avoid_when` or
  `a11y`.** Every component in your shard has real, readable source. If you truly
  cannot read one, do NOT write a file for it — say which one at the end. A file
  that exists but is empty looks like success and silently poisons the index; a
  missing file is detected and regenerated in seconds.
- **One file per component.** Never merge several components into one file.
- **Valid JSON only.** No markdown fences, no trailing commas, no comments.
- **Never skip a component** because it looks similar to a previous one. Near
  duplicates are exactly where a distinguishing blurb matters most.
