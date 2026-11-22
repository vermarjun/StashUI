---
name: stashui-review
description: Reviews existing web UI with deterministic checks that return counts, then by looking at the rendered page, and fixes only what is provably wrong. Use for a UI audit, design QA, an accessibility or consistency check, "review this page", "why does this look off", or after building UI with the stashui skill. Not for building new UI; use the stashui skill for that.
---

# Review UI

Separate what is provably wrong from what is opinion. Fix the first, report the second.

1. `{{CLI}} review [paths]` (add `--json` to parse it). Every FAIL row must reach 0:
   off-token colours, `transition: all`, removed focus outlines, images without alt, click handlers on divs, `h-screen`, animation with no reduced-motion guard.
2. Read `DESIGN.md`. Anything that contradicts it is a defect, not a preference.
3. Look at the page. Screenshot it at 375, 768 and 1440 wide (any browser tool; `npx playwright screenshot --full-page --viewport-size=1440,900 <url> shot.png` works with none). Check, in order:
   - nothing overflows sideways and no section is blank;
   - one accent hue, used for the primary action and little else;
   - one type scale: at most two families, body lines under 80 characters;
   - spacing between sections is even, and denser inside a section than between sections;
   - every interactive thing has a hover, a visible focus and a pressed state;
   - text is the product's own, with no demo copy left behind.
4. Fix deterministic defects. After each round re-run step 1 and look again; keep the change only if no number got worse and the page did not get worse. Three rounds at most.
5. A section that still looks wrong after that is usually the wrong component, not the wrong CSS: `{{CLI}} search "<what it must do>" --like <a neighbour that looks right>` and swap it.

Report: the numbers before and after, what you fixed, and opinions listed separately as opinions.
