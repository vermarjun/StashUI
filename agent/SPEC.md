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
| `browse` | `kinds` (1 to 4), `theme`, `accent` | one line per component | one row per kind, its best five |
| `search` | `query` (required), `kind`, `theme`, `accent`, `clean`, `like`, `page`, `dense` | one line per match | 12 matches, or 20 with `dense` |
| `view` | `name` | description, use and avoid, accessibility, footprint, cost, props, usage | six frames of its recorded interaction |
| `board` | `names` (2 to 12), `labels` | one line per component, and the accent hues across the set | the set, at the largest cells that fit |
| `code` | `name` | source files | none |
| `add` | `names` (1 to 20) | one `npx shadcn@latest add …` command, and what each component needs after install | none |

Errors are sentences that say what to do next (`No component named "x". Closest: a, b, c.`). MCP marks them `isError: true`; HTTP answers 400.

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

number, name, kind, what it visibly is, then in brackets: what triggers it, npm dependencies, hardcoded colours to replace with tokens, and the human quality score from 1 to 5.

## The catalogue

`/agent/catalog.json` is the whole index: `{ protocol, site, kinds: [{id, scale, aka, count}], items: [...] }`. One item:

| Field | Meaning | Source |
| --- | --- | --- |
| `name`, `title`, `origin`, `categories` | identity | registry |
| `kind`, `scale` | what it is, from the fixed taxonomy; scale is section, block, element or effect | vision pass |
| `blurb`, `use`, `look`, `tone` | what it visibly is, when to pick it, 3 to 5 fixed look words, one tone | vision pass, or the earlier text pass |
| `trigger`, `theme` | interaction triggers; light, dark or both | text pass |
| `deps`, `colours` | npm dependency count; hardcoded colours to replace | counted from source |
| `quality` | 1 to 5 | human review |
| `size`, `bleed` | the component's own width and height in a 1120 x 700 stage; whether it fills the stage | measured from the clip |
| `accents`, `vivid`, `lum` | accent hues, share of saturated pixels, mean luminance | measured from the clip |
| `moves`, `film` | mean change per sampled frame; the six frame times in seconds | measured from the clip |
| `tile` | whether a cropped still exists | pipeline |

`/agent/items/<name>.json` adds what `view` prints (description, props, usage, dependencies). `/r/<name>.json` is the shadcn registry item. Tiles are `/agent/tiles/<name>.webp` (480 x 300) and films `/agent/film/<name>.webp` (six 480 x 300 frames packed 3 x 2).

## Ranking

1. If `kind` is given, only that kind. Otherwise the first kind the query names (through each kind's `aka` words) is preferred, and other kinds must match at least two query words to appear.
2. Text match on name and title, kind words, description fields, weighted by how rare each word is.
3. Multiplied by the quality score.
4. Adjusted for fit: `theme` mismatch down; `accent` match up; no hardcoded colours up; dependencies and hardcoded colours slightly down; no tile down.
5. `like` adds similarity to the named component: same kind, same tone, shared accent hues, close luminance and saturation.
6. The same component ported by several libraries is shown once.

## MCP

`POST /api/mcp`, Streamable HTTP, stateless, JSON responses only, no session, no stream (`GET` answers 405). It serves protocol versions 2026-07-28 (version in each request's `_meta`, `server/discover`) and 2025-11-25, 2025-06-18, 2025-03-26 (`initialize` handshake). Tool results are a text block, then an image block for visual operations. They never carry `structuredContent`.

## Stability

Within protocol 1: operation names, required inputs, the sheet rules above, the legend's field order, and the catalogue fields listed here do not change meaning. Additions are allowed. Ranking weights, sheet styling and the kinds list may change; the kinds list is always available from `browse` and `catalog.json`.
