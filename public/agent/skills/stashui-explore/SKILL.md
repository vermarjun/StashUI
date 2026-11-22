---
name: stashui-explore
description: Explores several meaningfully different visual directions for a page using real StashUI components, and lets the user choose one before anything is built. Use when the user wants options, variants, concepts or a redesign direction, says "show me a few directions" or "what could this look like", or when a UI task starts with no decided look and no DESIGN.md. Not for a build whose direction is already chosen; use the stashui skill for that.
---

# Explore directions

Give the user a real choice between looks, made of components that exist, before any building.

1. Read `DESIGN.md` and run `{{CLI}} context`. Whatever is already decided (stack, brand colour, copy, required sections) is fixed across every direction.
2. Name three directions. Each must differ from the others on at least two of: hierarchy, density, composition, motion, tone. A different colour alone is not a direction.
3. For each direction, shop the two or three sections that carry the look (usually header, hero and one content section): `{{CLI}} browse` and `{{CLI}} search`, opening every image. Use `--like <first pick>` to keep a direction coherent.
4. `{{CLI}} board <picks>` once per direction. A direction whose board does not look like one product is not ready.
5. Write `plan.json` with `directions` (shape in the stashui skill's references/plan.md). Per direction: a name, the idea in one sentence, who it suits, its risk.
6. `{{CLI}} propose plan.json`, give the user the link, recommend one with your reason, and stop.
7. When they choose: record it in the Decisions section of DESIGN.md, drop the other two, and continue with the `stashui` skill.

Three boards cost three images. That is the whole price of not building the wrong page.
