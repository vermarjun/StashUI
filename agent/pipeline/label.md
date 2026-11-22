# Labelling contract

What the vision pass decides for each component, and nothing else. Everything measurable (size, colours, motion, deps) is measured elsewhere; this pass answers the questions only eyes can.

You are given a numbered sheet image of components and a JSON list with the same numbers. For every component return one object:

```json
{"name": "comp-578", "kind": "site-header", "blurb": null, "use": null, "look": ["minimal", "flat", "monochrome"], "tone": "minimal"}
```

- **kind**: exactly one id from the kinds list. Decide from the image first, the text second. Ask: *if someone were building a page, what would they be looking for when this is the right answer?*
  - A navigation bar is `site-header` even when it contains dropdowns. A page of settings is `settings-panel` even though it contains switches.
  - A full-width page section and a small part are different kinds: a pricing page section is `pricing-section`; a single plan card or a billing toggle is `pricing-card`.
  - A demo that wraps one control in a card is still that control.
  - An animated or shader backdrop is `background`, even if the demo puts a headline on it. It is a `hero` only when headline, copy and call to action are part of the component.
  - `other` only when nothing fits. Never guess a kind from the name alone.
- **blurb**: what it visibly is and does, at most 100 characters, no library names, do not restate the component name. Return `null` when the given blurb is already accurate; write one when it is missing, empty, or wrong.
- **use**: when to pick it, at most 120 characters. `null` when the given one is fine or you cannot tell.
- **look**: 3 to 5 words, only from this list, describing what you see:
  `flat outlined glass gradient neon glow shadowed textured 3d skeuomorphic monochrome colorful pastel dark light rounded sharp pill minimal dense airy bold playful technical editorial luxurious brutalist retro futuristic organic corporate`
- **tone**: one of `minimal decorative playful technical dramatic`.

Return a JSON array, one object per component, same order as the input. No commentary.
