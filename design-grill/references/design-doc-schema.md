# The design doc schema

Every field below is required. A doc with blanks is not a doc — if the grilling
did not settle a field, fill it in yourself and mark it `(assumed)` so it is
visible as a guess rather than passing as a decision.

Three files hold the same decisions in three shapes, and they must never
disagree: `DESIGN.md` (prose + reasoning), `design.tokens.json` (data, for the
build agent), `design.tokens.css` (OKLCH blocks for `globals.css`).

---

## 1. Product

| Field | What goes in it |
| --- | --- |
| `name` | Product name. |
| `one_liner` | What it does, in one sentence, no adjectives. |
| `audience` | Who opens it, and how often. "Ops leads, all day" and "consumers, twice" want different interfaces. |
| `primary_action` | The single thing a user is here to do. The design serves this; everything else gets out of its way. |
| `platform` | web / mobile web / desktop app / embedded. Affects density and hit targets. |
| `environment` | Where it is used — bright office, dark trading floor, phone outdoors. This decides light vs dark, not preference. |

## 2. Direction

| Field | What goes in it |
| --- | --- |
| `mood` | Exactly three adjectives. Three. Five means none. |
| `references_right` | Two products whose feel is right, and the specific thing each gets right. |
| `reference_wrong` | One that is close but wrong, and why. Draws the edge of the design. |
| `avoid` | Concrete banned moves — "no purple-to-cyan gradients", "no glassmorphism", "no drop shadows on text". |

## 3. Colour

All colour in **OKLCH**, because it is perceptually uniform: two hues at the same
L look equally bright, so you can shift hue without the palette going lumpy.
`oklch(L C H)` — L is 0–1 lightness, C is chroma (saturation), H is 0–360 degrees.

| Field | What goes in it |
| --- | --- |
| `mode` | `light`, `dark`, or `both` — and which is the default. |
| `accent` | One hue. `{ hue, chroma, light: oklch, dark: oklch, why }`. The `why` ties it to the domain, not to taste. |
| `accent_secondary` | Usually `null`. A second accent is a decision to justify, not a freebie. |
| `neutral_tint` | `pure` \| `warm` \| `cool` \| `accent-tinted`, with the hue. Pure grey (`C = 0`) reads cheap and unconsidered; a chroma of 0.005–0.02 toward the accent is what makes a palette feel authored. |
| `surfaces` | The elevation ladder: `background`, `card`, `popover`, `muted`, each as OKLCH. Three or four steps, no more. |
| `foreground` | Body text, muted text, and the contrast ratio each hits against its surface. Body must clear 4.5:1, large text 3:1. State the number. |
| `border` | Border and input-border. Usually the surface shifted 6–10% in L, never pure `#000` or `#fff` at low opacity. |
| `semantic` | `success`, `warning`, `danger`, `info`. **These are not accents.** Keep them distinguishable from the accent hue, and check the danger/accent pair for anyone with red-green colour blindness. |

Working ranges, so the palette doesn't fight itself:

- Light surfaces `L 0.96–1.00`, cards a step above or below the page, never equal.
- Dark surfaces `L 0.13–0.22`. Below 0.13 the elevation ladder collapses into black.
- Accent `C 0.12–0.22` for a saturated brand, `0.05–0.10` for a restrained one.
- Neutral `C 0.000–0.020`. Above that it stops being neutral.
- Body text against its surface: at least `0.45` L difference.

Defaults that read as AI-generated. Avoid unless there is a stated reason:
`#3b82f6` (Tailwind blue-500), purple→cyan gradients, `#8b5cf6` violet on a dark
page, neon-on-black "cyberpunk", every card a gradient border.

## 4. Type

| Field | What goes in it |
| --- | --- |
| `display` | Family + weights for headings. |
| `body` | Family + weights. May equal `display` — one family used well beats two used carelessly. |
| `mono` | For code, numerals, tabular data. Required if the product shows numbers in columns. |
| `scale` | The step ratio (1.200 minor third, 1.250 major third, 1.333 perfect fourth) and the resulting px sizes. List them; don't leave it as a ratio. |
| `measure` | Body line length in ch. 60–75 for prose, shorter in cards. |
| `leading` | Body and heading line-height. Headings tighten as they grow. |
| `why` | One sentence. "Inter because it's safe" is not a reason; it is the absence of one. |

## 5. Space, shape, elevation

| Field | What goes in it |
| --- | --- |
| `base_unit` | 4px or 8px. Every spacing value is a multiple. One unit, whole product. |
| `density` | `compact` \| `comfortable` \| `spacious`, and the control height that follows (32 / 36 / 44px). |
| `radius` | **One** value plus its derived steps (`sm = r/2`, `lg = r*1.5`). Mixed radii are the most common way a page stops looking like one product. |
| `elevation` | Shadow ladder, 2–3 steps. On dark surfaces prefer a lighter border to a shadow — shadows are close to invisible on dark and just add mud. |
| `container` | Max content width and the page gutter. |

## 6. Motion

| Field | What goes in it |
| --- | --- |
| `character` | One word: `crisp`, `smooth`, `springy`, `near-still`. Everything obeys it — if the hero eases slowly, the buttons do not snap. |
| `duration` | Fast (hover/press) and slow (enter/exit) in ms. Typically 120–180 and 250–400. |
| `easing` | One curve for entrances, one for exits. |
| `reduced_motion` | What `prefers-reduced-motion` turns off. Required, not optional. |

## 7. Slots

The pieces this interface needs, named before anything is pulled from the index.
Per slot: what it is, what it must do, and any hard constraint (`no npm deps`,
`must work without JS`, `renders 500 rows`). This list is what the MCP navigation gets
navigated against — it is the join between the doc and the component library.

## 8. Rejected

The section that makes the doc worth keeping. For each rejected option: what it
was, and the one-line reason it lost. Palettes considered, fonts tried,
components pulled and pulled back out.

Without this, a design doc is a description of what got built, which anyone can
read off the screen. With it, it is a record of decisions — and it answers the
question that actually gets asked later: "why is this teal?"

---

## Filled example (abbreviated)

```json
{
  "product": {
    "name": "Ledger",
    "one_liner": "Reconciles payment settlements across three processors.",
    "audience": "Two finance ops analysts, six hours a day.",
    "primary_action": "Find and resolve the mismatched rows.",
    "environment": "Bright office, dual monitors, all day."
  },
  "direction": {
    "mood": ["precise", "calm", "dense"],
    "references_right": ["Linear — restraint under density", "Stripe — numerals you trust"],
    "reference_wrong": "Notion — too soft, wastes vertical space we need",
    "avoid": ["gradient buttons", "purple", "decorative motion on data"]
  },
  "color": {
    "mode": "both",
    "default": "light",
    "accent": {
      "hue": 172, "chroma": 0.09,
      "light": "oklch(0.55 0.09 172)", "dark": "oklch(0.70 0.09 172)",
      "why": "Teal sits far from the red/green a reconciliation table needs for status, so the accent never reads as a state."
    },
    "accent_secondary": null,
    "neutral_tint": { "kind": "cool", "hue": 240, "chroma": 0.008 },
    "surfaces": {
      "background": "oklch(0.99 0.003 240)",
      "card": "oklch(1 0 0)",
      "muted": "oklch(0.96 0.005 240)"
    },
    "semantic": {
      "success": "oklch(0.62 0.14 145)",
      "danger": "oklch(0.58 0.19 27)",
      "warning": "oklch(0.75 0.15 75)"
    }
  },
  "type": {
    "display": "Inter Tight 600",
    "body": "Inter 400/500",
    "mono": "JetBrains Mono 400 — tabular numerals, required for the amount columns",
    "scale": { "ratio": 1.2, "px": [12, 14, 16, 20, 24, 30, 36] },
    "why": "Numerals are the content. Inter's tabular figures align in columns; a humanist serif would not."
  },
  "space": { "base_unit": 4, "density": "compact", "control_height": 32, "radius": 6 },
  "motion": { "character": "crisp", "duration": { "fast": 120, "slow": 220 }, "reduced_motion": "all transforms off, opacity only" },
  "rejected": [
    "Indigo accent — collided with the 'pending' status chip.",
    "Comfortable density — pushed the table to 14 visible rows; analysts need 25.",
    "Geist Mono — no tabular figures at the weight we need."
  ]
}
```
