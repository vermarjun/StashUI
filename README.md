<p align="center">
  <a href="https://stashui.vermarjun.xyz"><img src="docs/readme/banner-real.svg" alt="StashUI: describe the screen, your agent picks the parts by looking" width="100%"></a>
</p>

<p align="center">
  <a href="https://stashui.vermarjun.xyz"><b>Gallery</b></a> &nbsp;·&nbsp;
  <a href="#set-it-up-in-one-prompt"><b>Set up your agent</b></a> &nbsp;·&nbsp;
  <a href="#how-a-screen-gets-built"><b>How it works</b></a> &nbsp;·&nbsp;
  <a href="agent/SPEC.md"><b>Protocol</b></a>
</p>

StashUI is a library of 1,118 hand-picked React components, built so a coding agent can **see** them before it uses them. Your agent describes what it needs and gets back a picture of real matches, numbered. It picks by looking, checks that its picks fit together, and installs the whole screen with one shadcn command. The code lands in your repo and is yours.

## Set it up in one prompt

Paste this into Claude Code, Codex, Cursor or any coding agent with a shell:

```text
Set up StashUI for me: follow https://stashui.vermarjun.xyz/setup.md
```

The agent runs one command, the same on macOS, Linux and Windows. It puts a one-file CLI and three skills in your home folder. Nothing in your project changes, and there is no account, key or package to install.

After that, ask for UI the way you already do:

```text
Build a landing page for my app: header, hero, features, pricing, footer.
Dark and calm. Show me a mockup before you change anything.
```

Leave off the last sentence and it goes straight to building.

> [!TIP]
> No shell? In Claude Desktop, claude.ai or ChatGPT, add `https://stashui.vermarjun.xyz/api/mcp` as a remote MCP server. No login, the same six tools, and the images arrive inline.

## What your agent actually sees

This is the real image `stashui search "hero section for a dev tool, dark, with motion"` returns. Nothing here was mocked up for the README.

<p align="center"><img src="docs/readme/search-sheet.jpg" alt="A numbered grid of twelve hero sections returned by a search" width="100%"></p>

Each number comes with one line of facts, so the agent knows what a pick costs before it commits:

```text
 2  hero-dithering     Headline and button beside a pixelated blue vortex that never stops turning.
                       (always/hover · 1 deps · 4 colours · heavy · q4)
 6  shape-hero         Labelled pills and dots fall and pile up under a headline like loose objects.
                       (viewport/drag · 0 deps · 32 colours · q5)
```

Then it looks closer, and checks the set:

<p align="center"><img src="docs/readme/view-frames.jpg" alt="Six frames of a pricing table switching from monthly to yearly" width="100%"></p>

**`view`** shows six frames of one component in motion. You can see the monthly/yearly switch and the prices rolling, in a single still image.

<p align="center"><img src="docs/readme/board.jpg" alt="Header, hero, features, pricing and footer picks shown together" width="100%"></p>

**`board`** puts every pick on one sheet. For this set it also warned that the picks use two accent hues, so they need recolouring to your tokens before the page looks like one product.

## How a screen gets built

<p align="center"><img src="docs/readme/flow.svg" alt="The six steps: context, search, view, board, add, review, with an optional mockup and a review loop" width="100%"></p>

The skills tell the agent to follow these steps. Each step is one CLI command, and the same operation is available over MCP and HTTP.

## Why it is different

<p align="center"><img src="docs/readme/compare.svg" alt="A text-only component server returns names; StashUI returns a picture plus facts" width="100%"></p>

- **It searches by meaning.** You can search for "a pricing table with a monthly/yearly toggle" and get pricing tables with toggles back. A vision model watched every component once and wrote down what it is and how it moves. Search runs over those descriptions.
- **It is curated.** Every component was reviewed and scored by a person, so weaker components and near-duplicates are archived and don't come up.
- **It costs you nothing at runtime.** Installs go through the shadcn CLI, so you get source code in your repo. There is no StashUI package and no lock-in.

## For people: the gallery

<p align="center"><a href="https://stashui.vermarjun.xyz"><img src="docs/readme/gallery.jpg" alt="The StashUI gallery" width="100%"></a></p>

Browse by use case, press <kbd>⌘</kbd> <kbd>K</kbd> and describe what you want, or open any component to try the real thing at phone, tablet and desktop width. Every component page has its install command:

```bash
npx shadcn@latest add https://stashui.vermarjun.xyz/r/shimmer-button.json
```

## Under the hood

<p align="center"><img src="docs/readme/architecture.svg" alt="Hand-written registry files feed the registry build, clip capture and describe pass, which feed the gallery, the install registry and the agent API" width="100%"></p>

```bash
git clone https://github.com/vermarjun/StashUI.git && cd StashUI
npm install
npm run dev          # gallery on http://localhost:3000
npm run agent:dev    # agent API alone on :4317
```

| Command | What it does |
| --- | --- |
| `npm run registry` | Rebuild gallery data and install JSON after a registry change |
| `npm run capture -- <name>` | Record a component's preview clip |
| `npm run agent` | Rebuild everything agents are served (`public/agent/`) |
| `npm run agent:test` | Test the agent API, CLI, MCP endpoint and skills |

To add a component, put `<name>.tsx` and a `<name>.demo.tsx` that shows real content under `registry/<category>/`, add an entry to `registry.json`, then run `npm run registry`. Components have to work in plain React as well as Next.js: no `next/*` imports, and theme tokens instead of hex colours.

## Read more

- [agent/README.md](agent/README.md) explains how the agent side is built and why each decision was made.
- [agent/SPEC.md](agent/SPEC.md) is the protocol: six operations over MCP, HTTP and the CLI.
- [public/setup.md](public/setup.md) is the exact document your agent follows during setup.

---

<sub>Built on <a href="https://ui.shadcn.com">shadcn</a>, React, Next.js, Tailwind and Radix, with components by many authors, each credited in the gallery. <a href="LICENSE">MIT</a>.</sub>
