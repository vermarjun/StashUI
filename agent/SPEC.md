# StashUI Agent Protocol, version 1

How an agent finds, sees and installs a component. Everything here is public, read-only and needs no login.

## Operations

Six operations, defined once in `agent/core/tools.mjs`. The same names, inputs and outputs are served three ways:

| Door | Call | Image arrives as |
| --- | --- | --- |
| MCP | `POST /api/mcp`, tool `search` etc. | an `image` content block, after the text block |
| HTTP | `GET /api/agent/v1/search?query=…` | a URL in the `sheet` field of the JSON |
| CLI | `stashui search …` | a file under `.stashui/sheets/`, path printed after `IMAGE:` |

`GET /api/agent/v1` returns the full list with JSON Schemas for the inputs. In a query string, arrays are comma-separated.

| Operation | Input | Text | Image |
| --- | --- | --- | --- |
| `browse` | none | kinds with counts, by scale | none |
| `browse` | `kinds` (1 to 4), `theme`, `accent`, `avoid` | one line per component | one row per kind, its best five |
| `search` | `query` (required), `kind`, `like`, `avoid`, `clean`, `theme`, `accent`, `page`, `dense` | a first line saying how the request was read and how many components match, then one line per match | 12 matches, or 20 with `dense` |
| `view` | `name` | what it looks like and does, use and avoid, known issues, accessibility, how content goes in, footprint, cost, props, usage, and which of the six frames to trust | six frames of its recorded interaction |
| `board` | `names` (2 to 12), `labels` | one line per component, and the accent hues across the set | the set, at the largest cells that fit |
| `code` | `name` | source files | none |
| `add` | `names` (1 to 20) | one `npx shadcn@latest add …` command, and what each component needs after install | none |

`avoid` states hard limits; each drops every component that breaks it: `motion` (moves a lot or never stops), `webgl` (WebGL or three.js), `heavy` (heavy at runtime), `hover` (reacts only to hover, so dead on touch), `hardcoded` (copy written inside the file).

`search` is a description in plain words. Its first line reports what happened:

```
search "navbar with links and a sign up button" · read as site-header · 14 matches · page 1 of 2
search "glow" · kind button · avoiding webgl · best 48 of 57 matches · page 1 of 4
search "zxqv plorb" · no close match, 12 nearest shown · page 1 of 1
```

- With `kind`, every component of that kind matches, best first.
- Without it, the server reads the kind from the words ("read as …") as a preference, not a filter, and shows only what scores at least half as well as the best match (never fewer than six).
- "no close match" means nothing was near by meaning or by words; the twelve nearest are shown so the agent can see what the catalogue has instead.

Errors are sentences that say what to do next (`No component named "x". Closest: a, b, c.`). MCP marks them `isError: true`; HTTP answers 400.

People use the same ranking through `GET /api/search?q=…`, which returns names for the gallery and no image.

## The sheet

A JPEG, 1456 px wide and at most 840 px tall, so it costs at most 1,560 tokens on Claude and is never downscaled by a model provider.

- Cells are 8:5. Columns by count: up to 4 cells, 2 columns; up to 6, 3; up to 12, 4; more, 5.
- Each cell has a number in a yellow box at its top-left and the component's name under it.
- Each cell is cropped to the component. Small components are enlarged by at most 1.6x.
- Numbers in the image are the numbers in the text. In `search`, numbering continues across pages (page 2 starts at 13, or 21 when dense), and a component never appears twice in one search.
- In `view`, cells 1 to 6 are frames in time order.
- A component with no recording shows a grey cell that says so.

A sheet's specification is encoded in its URL (`/api/agent/v1/sheet?s=<base64url JSON>`). The same URL always yields the same image.

## The legend

One line per cell:

```
 6  comp-578   site-header   Mega menu navbar with icon, description, and simple submenu types.  (click/hover · 0 deps · 0 colours · q4)
```

number, name, kind, what it visibly is, then in brackets: what triggers it, npm dependencies, hardcoded colours to replace with tokens, any warnings, and the human quality score from 1 to 5. Warnings appear only when true: `copy in file` (its text is hardcoded), `heavy`, `install gap` (it imports a file the install does not ship), `recording partial|blank|broken`.

## The catalogue

`/agent/catalog.json` is the whole index: `{ protocol, site, kinds: [{id, scale, aka, count}], items: [...] }`. One item:

| Field | Meaning | Source |
| --- | --- | --- |
| `name`, `title`, `origin`, `categories` | identity | registry |
| `kind`, `scale` | what it is, from the fixed taxonomy; scale is section, block, element or effect | record |
| `blurb`, `use`, `look`, `tone` | what it visibly is (the record's tagline), when to pick it, 3 to 5 fixed look words, one tone | record |
| `text`, `phrases` | the long description and the ways people ask for it; searched, not shown | record |
| `trigger`, `motion`, `theme` | interaction triggers; none, subtle, pronounced or continuous; light, dark or both | record |
| `technique`, `weight`, `content`, `suits` | how it is drawn; light, moderate or heavy; where its content comes from (props, children, data-array, hardcoded, none); the kinds of product it suits | record |
| `polish`, `render` | the record's 1 to 5 for finish; `partial`, `blank` or `broken` when the recording is not usable (absent when fine) | record |
| `deps`, `colours`, `unresolved` | npm dependency count; hardcoded colours to replace; imports the install does not ship | counted from source |
| `quality` | 1 to 5 | human review |
| `size`, `bleed` | the component's own width and height in a 1120 x 700 stage; whether it fills the stage | measured from the clip |
| `accents`, `vivid`, `lum` | accent hues, share of saturated pixels, mean luminance | measured from the clip |
| `moves`, `film` | mean change per sampled frame; the six frame times in seconds | measured from the clip |
| `tile` | whether a cropped still exists | pipeline |

`/agent/items/<name>.json` adds what `view` prints (description, props, usage, dependencies). `/r/<name>.json` is the shadcn registry item. Tiles are `/agent/tiles/<name>.webp` (480 x 300) and films `/agent/film/<name>.webp` (six 480 x 300 frames packed 3 x 2).

## Ranking

One ranking serves the gallery and agents (`agent/core/search.mjs`).

1. Filters first: `kind` (only that kind), `avoid`, `clean`.
2. Words: query words matched against name and title, the search phrases, the tagline and look words, and the long description, weighted by how rare each word is.
3. Meaning: the query is embedded and compared with each component's description vector and each of its search-phrase vectors; the 60 nearest earn points by position. If the embedding model cannot load, this step is skipped and the answer keeps its shape.
4. Kind read from the words (through each kind's `aka` list) earns a bonus. It is a preference, not a filter.
5. Multiplied by the human quality score. A blank or broken recording counts against.
6. For agents only, small adjustments that settle ties: the record's finish score; `theme` mismatch down; `accent` match up; no hardcoded colours up; dependencies, hardcoded colours, a missing tile and an install gap down.
7. `like` adds similarity to the named component: how alike the two records read (their description vectors), the same kind and tone, and how alike they look (accent hues, luminance, saturation, measured from the clips).
8. The same component ported by several libraries is shown once.

The ranking is scored by `node agent/test/agent.eval.mjs` (the agent's search) and `node agent/test/find.eval.mjs` (the gallery's), on the same requests.

## MCP

`POST /api/mcp`, Streamable HTTP, stateless, JSON responses only, no session, no stream (`GET` answers 405). It serves protocol versions 2026-07-28 (version in each request's `_meta`, `server/discover`) and 2025-11-25, 2025-06-18, 2025-03-26 (`initialize` handshake). Tool results are a text block, then an image block for visual operations. They never carry `structuredContent`.

## Stability

Within protocol 1: operation names, required inputs, the sheet rules above, the legend's field order, and the catalogue fields listed here do not change meaning. Additions are allowed. Ranking weights, sheet styling and the kinds list may change; the kinds list is always available from `browse` and `catalog.json`.
