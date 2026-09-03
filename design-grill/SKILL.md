---
name: design-grill
description: Interrogate the user into a complete design doc before any UI is built. Asks one sharp question at a time — product, audience, mood, palette, type, motion — and writes DESIGN.md plus machine-readable design.tokens.json and a globals.css token block against a fixed schema. Use whenever the user is about to start a new interface, page, app or redesign; whenever they say "design doc", "grill me", "design system", "pick a palette", "what should this look like"; and before any build that would otherwise get default styling. Pairs with the StashUI MCP server and the ship-interface skill.
---

# design-grill

Build the design doc before the interface. Not after, not "as we go".

An agent that starts building without one makes a hundred small visual decisions
by default, and defaults are what make generated UI look generated: `#3b82f6`
blue, `Inter`, `rounded-lg`, four accent colours by the third section, purple
gradients on everything. None of those were decided. They were absorbed.

This skill fixes that by extracting the decisions from the person who has them —
through questions, one at a time — and writing them down in a fixed schema that
every later step can be checked against.

## The rules of the grilling

**One question at a time.** A wall of eight questions gets one lazy answer. A
single question gets a real one. Ask, listen, let the answer change the next
question.

**Use `AskUserQuestion` with concrete options, not open prompts.** "What's your
brand colour?" is a worse question than four named directions with a sentence of
consequence each. People recognise what they want faster than they can generate
it. Always include the option you would pick yourself, first, marked
`(Recommended)` — and say why in its description.

**Never ask what you can infer.** If they said "trading terminal", you already
know it wants density, dark, monospace numerals and a restrained accent. Don't
ask about density — state it as your read and ask the question that is genuinely
open: which of two accent strategies survives a red/green P&L column. Every
question you skip by reasoning buys you one you can afford to ask.

**Push back once when an answer will hurt them.** "Purple and cyan gradient" on a
clinical product deserves one sentence of resistance and an alternative. If they
repeat it, it is their call — write it in the doc as their decision and build it.

**Stop at eight questions.** Nine is an interrogation, not an interview. If a
field is still unsettled, decide it yourself, write it in as `(assumed)`, and say
so at the end. A stated assumption they can overturn in ten seconds beats a
question that stalls the build.

## The sequence

Work down this ladder. Skip any rung you can already answer from what they've
said or from the repo.

1. **Product and audience** — what is it, who opens it, what do they do in the
   first ten seconds. Everything downstream is a consequence of this.
2. **Reference points** — name two products whose feel is right, and one that is
   close but wrong. The wrong one is the more useful answer; it draws the edge.
3. **Mood** — three adjectives. Force a choice between prepared sets
   (*calm / precise / trustworthy* vs *loud / kinetic / playful* vs
   *dense / technical / fast*) rather than asking them to invent adjectives.
4. **Light or dark, and which is the default.** Not a style question — an
   environment question. Where and when is this open?
5. **Accent hue.** Offer four with reasoning tied to the domain, not to taste.
   Note what the accent must *not* collide with (status colours, a logo, an
   existing brand).
6. **Neutrals.** Pure grey reads cheap. Ask whether neutrals tint toward the
   accent, toward its complement, or stay pure — with the consequence stated.
7. **Type.** One family or a display/body pair. Offer real stacks, and say what
   each one costs (a variable font is a network request; a system stack is free
   and unremarkable).
8. **Density, radius, motion.** Usually one combined question: compact/comfortable,
   sharp/soft, and whether motion is present or near-absent.

## Writing the doc

Scaffold it, then fill it in from the answers:

```bash
python3 design-grill/scripts/scaffold_design_doc.py --project "Name"
```

It writes three files, which must stay in agreement:

- **`DESIGN.md`** — the human document. Prose decisions with the reasoning.
- **`design.tokens.json`** — the same decisions as data, for the agent that builds.
- **`design.tokens.css`** — `:root` / `.dark` OKLCH blocks to paste into `globals.css`.

A filled example of all three lives in `references/example/` — read it if you are unsure how much detail a field wants.

The full field list, the OKLCH ranges that actually work, and the defaults to
avoid are in `references/design-doc-schema.md`. Read it before writing the doc —
it is the schema this skill exists to produce.

The one section people skip and shouldn't: **Rejected**. Write down what you
considered and dropped, with the reason. It converts the doc from a description
of the output into a record of decisions, which is the only version that survives
someone asking "why is this teal" three weeks later.

## Then hand off

The doc is not the deliverable — the interface is. When it is written:

```
stashui_categories()
```

and continue with the **ship-interface** skill, which takes the doc, derives the
slot list, navigates the StashUI MCP server for each slot, installs, and recolours
everything to these tokens. Say so explicitly when you finish the doc, so the
next step is obvious rather than assumed.
