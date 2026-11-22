<div align="center">

# StashUI

**A React component library your coding agent can see.**

About 1,100 curated shadcn-style components. People browse them as live
previews. Agents get them as pictures, pick by looking, and install the whole
screen in one command.

[Gallery](https://stashui.vermarjun.xyz) ·
[Use it with an agent](#use-it-with-your-agent) ·
[Install by hand](#install-a-component-by-hand) ·
[How it works](agent/README.md)

</div>

---

## Use it with your agent

Paste this into Claude Code, Codex, Cursor or any coding agent that has a shell:

```text
Set up StashUI for me: follow https://stashui.vermarjun.xyz/setup.md
```

That is the whole setup. The agent runs one command (the same on macOS, Linux
and Windows), which puts a one-file CLI and three skills in your home folder.
Your project is untouched. There is no account or API key.

Then ask for UI the way you normally would:

```text
Build a landing page for my app: header, hero, features, pricing, footer.
Dark and calm. Show me a mockup before you change anything.
```

Drop the last sentence and the agent goes straight to building.

No shell (Claude Desktop, claude.ai, ChatGPT)? Add
`https://stashui.vermarjun.xyz/api/mcp` as a remote MCP server. No login, same
tools, images inline.

## How it is different

Most component MCPs hand the agent a list of names and descriptions, and the
agent guesses what they look like. StashUI shows it.

- **Search returns an image.** A query comes back as one numbered grid of the
  real components, with one line per number on what it does and what it costs
  to adopt. The agent chooses by looking, as a designer would.
- **Motion in a still.** `view` shows six frames of a component in action, so
  hover, click and scroll behaviour is visible.
- **Checks the set, not just the piece.** `board` puts every pick in one image
  to see whether they look like one product.
- **Search by describing.** "a pricing table with a monthly/yearly toggle"
  works. Every component was described once by a vision model from its frames
  and source, and search runs on those descriptions.
- **Mockup on request.** Ask for one and you get a page with each pick
  playing beside its runners-up. Swap what you dislike, then approve.
- **You own the code.** Installs go through the shadcn CLI, so the source lands
  in your project and is yours to edit.

## Install a component by hand

Pick one in the [gallery](https://stashui.vermarjun.xyz), copy its command:

```bash
npx shadcn@latest add https://stashui.vermarjun.xyz/r/shimmer-button.json
```

Needs a project set up with `npx shadcn@latest init`.

## Run it locally

```bash
git clone https://github.com/vermarjun/StashUI.git
cd StashUI
npm install
npm run dev        # gallery on http://localhost:3000
npm run agent:dev  # agent API alone on :4317
```

| Command | What it does |
| --- | --- |
| `npm run registry` | Rebuild gallery data and installable JSON after a registry change |
| `npm run agent` | Rebuild everything agents are served (`public/agent/`) |
| `npm run agent:test` | Test the agent API, CLI, MCP endpoint and skills |
| `npm run capture -- <name>` | Record a component's preview clip |

Adding a component: put `<name>.tsx` and a real `<name>.demo.tsx` under
`registry/<category>/`, add it to `registry.json`, run `npm run registry`.
Components must work in plain React and Next.js: no `next/*` imports, theme
tokens instead of hex colours.

## More

- [agent/README.md](agent/README.md): how the agent side is built, and why
- [agent/SPEC.md](agent/SPEC.md): the protocol
- [public/setup.md](public/setup.md): what the setup prompt actually does

Built on [shadcn](https://ui.shadcn.com/), React, Next.js, Tailwind and Radix,
with components from many authors, credited in the gallery.
[MIT](LICENSE).
