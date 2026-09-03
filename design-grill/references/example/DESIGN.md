# Ledger — design doc

Generated from `design.tokens.json`. Change the JSON and re-run
`scaffold_design_doc.py --sync`; do not edit the two derived files by hand.

## 1. Product

Reconciles settlements across three processors.

- **Audience** — Two ops analysts, six hours a day.
- **Primary action** — Resolve mismatched rows.
- **Platform** — web
- **Environment** — Bright office, dual monitors.

## 2. Direction

**Mood:** precise, calm, dense

Right: Linear — restraint under density; Stripe — numerals you trust
Close but wrong: Notion — too soft

Avoid: gradient buttons, purple

## 3. Colour

Mode: both (default light). All values OKLCH.

**Accent** `oklch(0.55 0.09 172)` / dark `oklch(0.70 0.09 172)` — hue 172, chroma 0.09.
Teal sits far from the red/green a reconciliation table needs for status.

Secondary accent: none — one accent, deliberately
Neutrals: cool (hue 240, chroma 0.008)

| Token | Light | Dark |
| --- | --- | --- |
| background | `oklch(0.99 0.003 240)` | `oklch(0.16 0.006 240)` |
| card | `oklch(1 0 0)` | `oklch(0.19 0.006 240)` |
| muted | `oklch(0.96 0.005 240)` | `oklch(0.23 0.006 240)` |
| foreground | `oklch(0.22 0.01 240)` | `oklch(0.96 0.004 240)` |
| border | `oklch(0.91 0.005 240)` | `oklch(0.27 0.008 240)` |

Body contrast: 12.1:1 light / 13.4:1 dark.

Semantic (**not** accents): success `oklch(0.62 0.14 145)`, warning `oklch(0.75 0.15 75)`, danger `oklch(0.58 0.19 27)`, info `oklch(0.60 0.11 240)`.

## 4. Type

- **Display** — Inter Tight 600
- **Body** — Inter 400/500
- **Mono** — JetBrains Mono 400 — tabular numerals
- **Scale** — ratio 1.25: 12px, 14px, 16px, 20px, 25px, 31px, 39px
- **Measure** — 65ch · **Leading** — 1.6 body / 1.15 heading

Numerals are the content.

## 5. Space, shape, elevation

Base unit 4px · density compact · control height 32px · radius 6px (one value, derived steps only).
Container 1200px with a 24px gutter.
Elevation: 0 1px 2px oklch(0 0 0/.06), 0 4px 12px oklch(0 0 0/.08)

## 6. Motion

Character **crisp** — 150ms fast, 300ms slow.
Enter `cubic-bezier(.16,1,.3,1)`, exit `cubic-bezier(.4,0,1,1)`.
Reduced motion: all transforms off, opacity only

## 7. Slots

Navigate the StashUI MCP server against this table, one row at a time:
`stashui_categories()` -> `stashui_category(slug, ...)` -> `stashui_component(name)`

| Slot | Needs | Constraint | Component chosen |
| --- | --- | --- | --- |
| page background | quiet, no motion | no npm deps | _unfilled_ |
| primary CTA | one clear action | — | _unfilled_ |

## 8. Rejected

- Indigo accent — collided with the pending chip.
