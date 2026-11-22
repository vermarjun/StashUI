# StashUI for agents

The gallery is for people. This folder is how an agent does the same job: find a component, look at it, compare it with its neighbours, pick one, install it. The difference from every other component MCP server is one idea: **the agent sees the components.** A request comes in as text and goes out as one image, a numbered grid of real components, with one line of text per number.

## The shape of it

```
clips ──tiles.py──▶ tile + six-frame film + measured facts ┐
index records ─────────────────────────────────────────────┼─build.mjs─▶ public/agent/  (static files: the whole database)
records (one per component, from frames + code) ───────────┘
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
| `pipeline/` | `tiles.py` (clips to images and facts), `describe*` (the record written from frames + code, see below), `posters.py` (the chosen frame becomes the still), `search-index.mjs` (meaning vectors), `kinds.json` (the taxonomy), `build.mjs` (everything to `public/`). |
| `data/` | `facets/<name>.json` measured from pixels, `records/<name>.json` the full record, `describe-raw/<name>.json` the model's answer kept verbatim . One file per component so parallel work never collides. |
| `model/` | The embedding model files, fetched by `npm run agent:model`. Git-ignored. |
| `test/` | `npm run agent:test`. |
| `SPEC.md` | The protocol: operations, the sheet format, the catalogue schema, what is stable. |

The Next.js side is two thin routes (`src/app/api/agent/v1/[[...op]]`, `src/app/api/mcp`) and one adapter (`src/lib/agent-route.ts`).

## Adding or re-recording a component

After the usual steps (`npm run registry`, capture the clip):

```bash
python3 agent/pipeline/tiles.py            # on the recording Mac: only clips newer than their tile
npm run agent:describe -- --shards 20      # packets (frames + code) for whatever has no record yet, in .describe/
#   one `describer` agent per shard follows agent/pipeline/describe.md (brief: describe-brief.md)
#   and checks itself with: npm run agent:describe:check -- --shard .describe/shards/shard-NNN.txt
npm run agent:describe:merge               # validates, corrects from source, files the records, prints review lists
python3 agent/pipeline/posters.py          # the frame each record chose becomes its tile (--gallery: the poster too)
npm run agent                              # rebuilds public/agent and the search vectors (also runs at the end of `npm run registry`)
npm run agent:test && node agent/test/agent.eval.mjs && node agent/test/find.eval.mjs
```

A component with no tile still appears (the raw poster is used) and one with no record falls back to its category and its older text, so nothing breaks while the pipeline catches up. `npm run agent` prints how many are in each state.

## The record: one look at each component, kept

`pipeline/describe.md` is the contract. A vision model is shown six numbered frames of the component's clip and its source, with the facts already measured from the clip, and writes one JSON record. The record is the only place a model's judgement about a component lives; the gallery, search and the agent operations are all projections of it, so none of them needs a model of its own.

| Group | Fields | Used by |
| --- | --- | --- |
| For people | `tagline` (80 chars), `summary` (240), `title_fix` | gallery cards, detail page, agent list rows |
| What is seen | `appearance`, `behaviour`, `parts`, `states`, `look`, `tone`, `demo_content` | search text, `view`; `demo_content` is kept out of search on purpose |
| What it is for | `kind`, `search_phrases` (8), `resembles`, `use_when`, `avoid_when`, `suits`, `slot_hints`, `traits` | search, filters, choosing between two |
| Cost to adopt | `content_from`, `customise`, `technique`, `weight`, `responsive`, `a11y`, `props` | `view`, filters, review |
| Honest assessment | `frames` (best frame, usable frames, render check, whether the clip shows the interaction), `issues`, `polish`, `unsure` | the still, the lists of clips to fix |

Rules that keep it trustworthy:

- **The model is asked only what needs eyes or judgement.** Size, palette, motion, dependencies and prop defaults are measured and handed to it as facts.
- **One job per field**, with a length cap, and a fixed word list wherever the field is filtered on (`describe-vocab.json`).
- **What can be checked is checked at merge.** A prop name that is not in the source is dropped; defaults are read from the parameter list by regex; `a11y.reduced_motion` is set from a search of the code.
- **Every image carries a four-digit code** the record must quote. A record that describes a component without having opened its image fails the check.
- **Raw output is stored twice.** `describe-raw/` is never edited, so changing a cap or a rule is a re-merge, not a re-run.
- **A record knows what it was made from** (`_meta`: model, contract hash, source hash, film hash). Only a component whose code or clip changed needs describing again.

The run is cheap enough to repeat (a few cents per shard of 20 on DeepSeek V4.1 Flash); the schema is the part meant to last.

## Search by description

People and agents both describe what they want in plain words. Two signals rank the catalogue:

- **Words** (`core/search.mjs`): tokens weighted by where they appear (name, kind, search phrases, tagline, description) and how rare they are.
- **Meaning** (`core/semantic.mjs`): each component has one vector for its description and one per search phrase; the query is embedded and a component scores as its best-matching vector. The 60 closest earn points by position.

`core/find.mjs` is the gallery's search (`GET /api/search?q=`); the agent's `search` operation uses the same ranking. What an agent's search adds, because only an agent has them:

- **A project to fit and a cost to pay**: theme, accent, dependencies, colours to replace, install gaps. These are small on purpose and only settle ties.
- **Hard limits** (`avoid`): no motion, no WebGL, nothing heavy, nothing hover-only, no hardcoded copy. Filters, read from the record.
- **A component to stay consistent with** (`like`): how alike two records read (their description vectors, no model call) and how alike two clips look (measured palette).
- **An honest shortlist**: only what scores at least half as well as the best match is shown, never fewer than six, and when nothing is close the answer says so. Twelve cells are precious; padding them with whatever shared a word wastes the image.

Both are scored on the same 37 requests (`test/find.eval.json`, one intended component each): `node agent/test/agent.eval.mjs` for the agent's search, `node agent/test/find.eval.mjs` for the gallery's. Today both put the intended component first 21 times, in the top five 34 times, and the agent's search has it on page one 37 times.

The vectors are one static file (`public/agent/search/vectors.bin`) scanned in about a millisecond, so there is no vector database. The model (all-MiniLM-L6-v2, 23 MB, a few milliseconds per query on a CPU) is optional at runtime: if it cannot load, search falls back to words alone and nothing else changes.

## Decisions, and why

**Images, not descriptions, decide.** A blurb cannot tell an agent whether a component matches the page it is building. No other product found returns a sheet of components to the model; they return text, and a link at best.

**One sheet is 1456 x 840 or smaller.** That is the largest image Claude's standard tier keeps at full resolution (52 x 30 patches of 28 px, 1,560 of a 1,568 token budget), and it is inside what OpenAI and Gemini document. Twelve cells by default, twenty for small things. A bigger sheet is shrunk by the provider and loses the detail it exists to show.

**Every cell is cropped to the component and zoom is capped at 1.6x.** Posters put a small button in a large stage; uncropped, a fifth of a sheet was specks. The crop is measured from the clip (pixels that differ from the stage in at least 12% of frames), not guessed from one frame.

**The film is six frames chosen where the clip changes**, not evenly spaced, with the loop's fade-in and fade-out skipped. Six stills then show idle, hover, active and settle; evenly spaced frames mostly show idle.

**Labels are drawn with a built-in bitmap font.** System text rendering gives different pixels per machine and blank labels on a server with no fonts. The same spec yields the same bytes everywhere, which is also what makes sheets testable.

**The agent describes; the server matches by words and meaning; the agent chooses by looking.** When the agent also names one of the 75 kinds, that is an exact filter. When it does not, the kind read from its words is a preference only. Treating an inferred kind as a filter, or discounting other kinds, was measured and rejected: it removes the component the request meant (35 of 37 on page one instead of 37) more often than it removes a wrong-kind one.

**An agent's shortlist is cut relative to the best match, not at a fixed similarity.** The gallery hides anything under a similarity of 0.42. For an agent that drops right answers: "box you open with ctrl k to jump anywhere" ranks the command palette fifth with a similarity of 0.40. Across 40 requests the intended component never scored below 0.66 of the best, so the agent is shown everything at 0.5 or above.

**A small embedding model does sit in the request path, and it is optional.** The first version had none. It was added when plain-English search came to the gallery: a person does not name a kind, and "ctrl k box" shares no word with "command palette". Measured on 37 everyday-language queries (`test/find.eval.mjs`). The intelligence is still spent at build time (the search phrases in each record did more than the model); the model covers wording nobody anticipated.

**What needs eyes or judgement comes from one vision pass; everything else is measured.** Size, palette, motion, dependencies and hardcoded colours are computed. Kind, look, the descriptions and the choice of still are asked of a model once, against a written contract and fixed vocabularies, and anything outside the contract is rejected at merge.

**The still is chosen, not computed.** The first tiles used the frame with the most pixels differing from the stage. That picks a mid-transition blur as often as the finished state. The describe pass names the one frame that makes the component recognisable, and `posters.py` cuts the tile from it.

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
