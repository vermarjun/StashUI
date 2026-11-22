# DESIGN.md

One file at the project root. It holds the decisions that make generated UI look decided instead of default. Format: the open [DESIGN.md](https://github.com/google-labs-code/design.md) spec (YAML tokens on top, short prose below), plus a Decisions log.

## Fill it in this order
1. **Read before asking.** `{{CLI}} context`, the global CSS, the fonts, two existing screens. Whatever the project already decided goes in as-is.
2. **Ask only for what is missing**, one question at a time, each with 3 or 4 concrete options and your recommendation first. Five questions at most:
   product and who opens it; two products whose feel is right and one that is close but wrong; mood, as a choice between prepared sets (calm / precise / trustworthy, loud / kinetic / playful, dense / technical / fast); light or dark by default; accent hue, argued from the domain.
3. **Decide the rest yourself** and mark it `(assumed)`. A stated assumption the user can overturn beats a sixth question. If the user cannot be asked at all, decide everything this way.

## Shape
```markdown
---
version: alpha
name: <product>
description: <one line: what it is, for whom, the mood in three words>
colors:
  background: "#0B0B0C"
  foreground: "#F5F5F4"
  primary: "#F97316"          # the one accent
  primary-foreground: "#0B0B0C"
  muted: "#18181B"
  muted-foreground: "#A1A1AA"
  border: "#27272A"
typography:
  display: { fontFamily: Geist, fontSize: 56px, fontWeight: 600, lineHeight: 1.05, letterSpacing: -0.02em }
  body: { fontFamily: Geist, fontSize: 16px, fontWeight: 400, lineHeight: 1.6 }
rounded: { sm: 6px, md: 10px, lg: 16px }
spacing: { section: 96px, gutter: 24px }
motion:
  enter: { duration: 200ms, timingFunction: ease-out }
---
## Overview
Who it is for, the three mood words, the two references and the one anti-reference.
## Colors
One accent. Where it may appear (primary action, focus, one highlight per view) and where it may not.
## Typography
## Layout
Density, max width, section rhythm.
## Motion
What moves, how fast, and what must stay still.
## Do's and Don'ts
Five lines each, specific to this product.
## Decisions
- 2026-01-15 · hero: shape-hero over parallax-floating · quieter, keeps the headline first. (approved)
```

## Then
Write the colours into the global CSS as the shadcn variables of the same names (`--background`, `--primary`, …) **before installing anything**: components pick tokens up on arrival. Use the colour format that file already uses (oklch if it is oklch), and set what follows from your choices too: `--primary-foreground`, `--ring`, `--card`, `--popover`, and the default theme class.
Every approved proposal adds one dated line per pick to Decisions. Read Decisions before shopping: a past choice is a constraint.
Optional check: `npx @google/design.md lint DESIGN.md` reports contrast and broken references.
