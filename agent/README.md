# StashUI for agents

The gallery is for people. This folder is how an agent does the same job: find a component, look at it, compare it with its neighbours, pick one, install it. The difference from every other component MCP server is one idea: **the agent sees the components.** A request comes in as text and goes out as one image, a numbered grid of real components, with one line of text per number.

## The shape of it

```
clips ──tiles.py──▶ tile + six-frame film + measured facts ┐
index records ─────────────────────────────────────────────┼─build.mjs─▶ public/agent/  (static files: the whole database)
vision labels (kind, look, missing descriptions) ──────────┘
                                                                   │
                                              agent/core  (search · sheet composer · six operations)
                                                    │ one handler, three doors
                     ┌──────────────────────────────┼──────────────────────────────┐
              POST /api/mcp                 GET /api/agent/v1/<op>            public/agent/stashui.mjs
          MCP clients, image inline      anything that can fetch            the CLI, for agents with a shell
```

| Path | What it is |
| --- | --- |
| `core/` | Framework-free ESM. `sheet.mjs` composes images, `search.mjs` ranks, `tools.mjs` defines the six operations once, `mcp.mjs` and `http.mjs` expose them. |
| `cli/stashui.mjs` | The CLI. One file, no dependencies. Also reads the user's project (`context`), checks UI source (`review`) and installs itself (`init`). |
| `skills/` | `stashui` (build), `stashui-explore` (choose a direction), `stashui-review` (audit). |
| `site/` | `setup.md`, `llms.txt`, and `proposal.html`, the page a person approves. |
| `pipeline/` | `tiles.py` (clips to images and facts), `label-*.mjs` + `label.md` (the vision pass), `kinds.json` (the taxonomy), `build.mjs` (everything to `public/`). |
| `data/` | `facets/<name>.json` measured from pixels, `labels/<name>.json` from the vision pass. One file per component so parallel work never collides. |
| `test/` | `npm run agent:test`. |
| `SPEC.md` | The protocol: operations, the sheet format, the catalogue schema, what is stable. |

The Next.js side is two thin routes (`src/app/api/agent/v1/[[...op]]`, `src/app/api/mcp`) and one adapter (`src/lib/agent-route.ts`).

## Adding or re-recording a component

After the usual steps (`npm run registry`, capture the clip):

```bash
python3 agent/pipeline/tiles.py            # on the recording Mac: only clips newer than their tile
node agent/pipeline/label-batches.mjs <work-dir>   # sheets of whatever has no label yet
#   one agent per few batches follows agent/pipeline/label.md and writes <work-dir>/out/batch-NN.json
node agent/pipeline/label-merge.mjs <work-dir>     # validates against the contract, files the labels
npm run agent                              # rebuilds public/agent (also runs at the end of `npm run registry`)
npm run agent:test
```

A component with no tile still appears (the raw poster is used) and one with no label falls back to its category, so nothing breaks while the pipeline catches up. `npm run agent` prints how many are in each state.

## Decisions, and why

**Images, not descriptions, decide.** A blurb cannot tell an agent whether a component matches the page it is building. No other product found returns a sheet of components to the model; they return text, and a link at best.

**One sheet is 1456 x 840 or smaller.** That is the largest image Claude's standard tier keeps at full resolution (52 x 30 patches of 28 px, 1,560 of a 1,568 token budget), and it is inside what OpenAI and Gemini document. Twelve cells by default, twenty for small things. A bigger sheet is shrunk by the provider and loses the detail it exists to show.

**Every cell is cropped to the component and zoom is capped at 1.6x.** Posters put a small button in a large stage; uncropped, a fifth of a sheet was specks. The crop is measured from the clip (pixels that differ from the stage in at least 12% of frames), not guessed from one frame.

**The film is six frames chosen where the clip changes**, not evenly spaced, with the loop's fade-in and fade-out skipped. Six stills then show idle, hover, active and settle; evenly spaced frames mostly show idle.

**Labels are drawn with a built-in bitmap font.** System text rendering gives different pixels per machine and blank labels on a server with no fonts. The same spec yields the same bytes everywhere, which is also what makes sheets testable.

**The agent names the kind; the server filters and ranks; the agent chooses by looking.** No embedding model sits in the request path. Sorting a need into one of 75 kinds is something a language model does well for free, filtering by kind is exact, and the final judgement is visual. Ranking inside a kind uses text match, the human quality score, fit with the project's theme and accent, and adoption cost.

**Kind and look come from a vision pass; everything else is measured.** Size, palette, motion, dependencies and hardcoded colours are computed. Only what needs eyes is asked of a model, against a fixed vocabulary, and anything outside the contract is rejected at merge.

**The CLI is the main door, MCP the second.** An image saved to disk and opened with the agent's own file reader works in every agent that has a shell, in the session where it was installed, with no restart. MCP image results work in Claude Code (tested) but are reported unreliable or broken in several other clients, so MCP is for agents with no shell. Both doors call the same six operations.

**No `structuredContent` in MCP results.** At least one client drops images when it is present.

**The server is stateless and the database is static files.** A sheet's spec travels in its URL, so nothing is stored and the same request always yields the same image. Any instance can answer any request. New components deploy as files.

**The MCP endpoint speaks both protocol eras** (the `initialize` handshake up to 2025-11-25, and per-request versions from 2026-07-28), because clients in the field are split.

**Setup is three commands an agent can run, served from this site.** No npm publish, no account, no `curl | sh`. `init` verifies every skill file against a published SHA-256 and writes only `~/.stashui/stashui.mjs` and the two skill folders, `~/.claude/skills` and `~/.agents/skills`. It adds nothing to PATH; skills call the CLI by its path. An earlier version linked itself into a PATH directory, and a test run left a stale link behind on the first machine it touched, which is the reason.

**`add` says what an install really needs.** The registry items are read at build time. 193 of them import shadcn primitives they do not declare, so `add` names those primitives in the command. 95 import a sibling file the item does not ship; each is flagged in `view` and `add` ("NOT installed") and ranked lower, and `npm run agent` prints the count. That number should be driven to zero in the registry itself; until then the agent is told before the type checker tells it.

**The design doc is the open DESIGN.md format** plus a Decisions log, read before shopping and appended to after every approval. Tokens live in the project's global CSS under shadcn's names so installed components pick them up with no mapping.

**A person approves before anything is built.** Studies of models judging UI agree on one thing: a model's pick is a good shortlist and an unreliable final say. So the agent proposes, with runners-up, and waits.

**Review returns numbers.** Deterministic source checks with counts that must reach zero, then a look at the rendered page, keeping a change only if nothing got worse. Unstructured self-critique loops are known to drift; a number does not.

## What is deliberately not here

Accounts, keys and rate limits (put them in the reverse proxy if abuse appears). Usage telemetry (the access log already records which components are searched, viewed and added). A generator for missing components (the coding agent builds gaps itself and says so). Rendering components in the user's own colours before install.
