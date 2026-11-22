---
name: stashui
description: Builds web UI from the StashUI catalogue of ready-made, tested React components instead of writing components from scratch. Shows real images of the components so the choice is made by look, installs them and verifies the result, and can show an HTML mockup of the picks first when the user asks for one. Use for any request to build, design, redesign or polish a page, screen, section or component in a React and Tailwind project (landing page, dashboard, hero, pricing, navbar, form, modal), and whenever the user asks to find, pick or add a UI component.
---

# Build UI from StashUI

You are doing the job a person does when they spend hours in component galleries: find what exists, look at it, pick the best fit. Do not write a component the catalogue already has.

Commands print text and save an image. **Open every image they name.** The choice is made by looking, not from the text.

## 1. Know the project
`{{CLI}} context` prints the stack, the design tokens and the components already installed.
- No `DESIGN.md`: write it first, following [references/design-doc.md](references/design-doc.md). It outranks your taste.
- An installed component already covers a need: use it. Never install a twin.

## 2. Plan
List what the screen needs, top to bottom. One line each: what it must do, and any hard limit (works on touch, no WebGL, must not animate).
If neither the user nor DESIGN.md has fixed the visual direction, use the `stashui-explore` skill before going further.

## 3. Shop, one need at a time
1. `{{CLI}} browse` lists the kinds. `{{CLI}} browse hero pricing-section footer` (up to 4) shows the best five of each in one image.
2. Nothing right in a row: `{{CLI}} search "<the piece in plain words: what it is, does, looks like>"`. It matches by meaning, so describe it the way you would to a person. Add `--kind <kind>` to see only that kind, and state hard limits as `--avoid motion,webgl,heavy,hover,hardcoded` so nothing that breaks them is shown.
3. Read the image before the text. Strike out what is the wrong kind of thing. Keep at most three that fit DESIGN.md.
4. `{{CLI}} view <name>` on your top two. A still hides motion; the six frames show it, and the text says which frame to trust and what the recording missed.
5. Choose in this order: hard limits, fit with the pieces already chosen (`--like <chosen>` ranks what looks and reads like it), fit with DESIGN.md, then fewest colours to replace and fewest deps.

Ask for page 2 only when page 1 gave fewer than two candidates. "No close match" means it: describe it once more differently, and if that is no better it is a gap. Say so and build that one piece yourself from the tokens.

## 4. Check the set
`{{CLI}} board <picks in page order> --labels header,hero,…` shows them together. A pick that looks like it came from another product gets replaced.

## 5. Mockup, only when asked
Go straight to step 6 unless the user asked for a mockup, a preview, or to approve the picks before you build. Only then: write `plan.json` ([references/plan.md](references/plan.md)), run `{{CLI}} propose plan.json`, give the user the link, and build nothing until they answer.

## 6. Build
`{{CLI}} add <names>`, then do what its notes say: supply any import it flags as not installed, replace hardcoded colours with tokens, wrap sized-parent components. Run the type check. Delete demo code and use the product's real copy. `{{CLI}} code <name>` only for a component you are changing.

## 7. Verify
Run `{{CLI}} review` until every FAIL row is 0. Then open the built page at 375, 768 and 1440 wide and look at it: no overflow, no blank section, one accent, and it still looks like the board. Keep a fix only if it made nothing worse. Append the picks to the Decisions section of DESIGN.md.

Report in a few lines: each pick, its runner-up and why, what you built by hand, the review numbers.
