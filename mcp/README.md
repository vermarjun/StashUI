# @vermarjun/stashui-mcp

MCP server over the StashUI registry — 1518 React components, **navigated rather
than searched**.

## Why not just list the components

Razorpay's Blade MCP puts all 89 component names into the tool's parameter
description and lets the model pick. That is the right call at 89. At 1518 the
catalogue neither fits in a tool schema nor is useful once it does — so this
server is layered instead, and each layer costs only what its question needs.

| Tool | Question | Response |
| --- | --- | --- |
| `stashui_categories` | which category? | ~1.1k tokens |
| `stashui_category(slug, …filters)` | which components? | 350 – 4,800 tokens |
| `stashui_component(name)` | is this the one? | ~300 tokens |
| `stashui_code(name)` | how is it built? | on request only |
| `stashui_slot(slot)` | what fits this slot, across categories? | varies |
| `stashui_install(names[])` | one command for the whole screen | tiny |

Root → category → component → code. Every response is read from one file, and no
file holds the whole tree, so nothing can be loaded whole by accident.

## Choosing between 97 buttons

The question this server exists to answer. Five steps, and only two of them are
the model reading prose:

1. Category summaries route it to `buttons`; `see also` catches the ambiguous case.
2. **Filters cut 97 → 6 mechanically**, before anything is read —
   `stashui_category("buttons", trigger="hover", tone="minimal", clean_only=true)`
   returns ~350 tokens instead of ~2,800.
3. Blurbs separate those 6 by what they visibly do.
4. `use_when` / `avoid_when` decide between the last two.
5. When two candidates are the *same* component ported by different libraries —
   192 components here are — prose is useless, so `ALTERNATIVES` ranks them by
   integration cost (npm deps, then hardcoded colours to replace).

## Install

From the repository root:

```bash
npm --prefix mcp install
npm run mcp:build
```

Use the absolute path to the generated entry file when configuring a client:

```text
/absolute/path/to/StashUI/mcp/dist/index.js
```

### Codex

```bash
codex mcp add stashui -- node /absolute/path/to/StashUI/mcp/dist/index.js
codex mcp list
```

The equivalent `~/.codex/config.toml` or project-scoped `.codex/config.toml`
entry is:

```toml
[mcp_servers.stashui]
command = "node"
args = ["/absolute/path/to/StashUI/mcp/dist/index.js"]
```

### Claude Code

```bash
claude mcp add stashui --scope project -- node /absolute/path/to/StashUI/mcp/dist/index.js
claude mcp list
```

The CLI writes this shareable `.mcp.json` configuration:

```json
{
  "mcpServers": {
    "stashui": {
      "command": "node",
      "args": ["/absolute/path/to/StashUI/mcp/dist/index.js"]
    }
  }
}
```

Cursor (`.cursor/mcp.json`) and Claude Desktop
(`claude_desktop_config.json`) use the same `mcpServers` object.

### VS Code

VS Code uses a `servers` object in `.vscode/mcp.json`:

```json
{
  "servers": {
    "stashui": {
      "type": "stdio",
      "command": "node",
      "args": ["/absolute/path/to/StashUI/mcp/dist/index.js"]
    }
  }
}
```

Restart the client after adding the server. The server locates the index by
looking, in order, at `$STASHUI_INDEX`, `../index`, then
`../../agent-index/index`. Set `STASHUI_INDEX` to the directory containing
`categories.json` if the compiled server is moved elsewhere.

Test the connection with the MCP Inspector:

```bash
npm --prefix mcp run inspect
```

For the full project overview, component installation guide, and agent workflow,
see the [root README](../README.md).

## How the index is built

```bash
python3 agent-index/scripts/extract_records.py    # mechanical fields from source
#   ...generation: 46 shards, one Haiku agent each (spec/PROMPT.md is the contract)
python3 agent-index/scripts/validate_raw.py       # contract check, names what to repair
python3 agent-index/scripts/merge_records.py      # raw + mechanical -> enriched
python3 agent-index/scripts/build_index.py        # -> agent-index/index/
```

Generated output is written **twice**: `spec/raw/<name>.json` is the model's
verbatim response and is never edited; `records.enriched.jsonl` is a validated
projection of it. Any future change to formatting, truncation or validation is a
re-run of `merge_records.py` and costs nothing — regeneration is only needed for
genuinely new information.

Nothing an agent pastes into code comes from a model unchecked:

- **props** — every name must appear verbatim in the source (107 invented props
  were rejected on the first run)
- **defaults** — read from the destructured parameter list by regex, not
  generated (682 recovered that the model had missed in the type block)
- **usage** — the component's real `.demo.tsx`, with imports rewritten to the
  consumer path
- **traits / slots** — coerced to a fixed vocabulary; out-of-vocabulary values dropped

## Layout

```
agent-index/
  spec/
    SCHEMA.md                 what each layer provides, and where each field comes from
    PROMPT.md                 the generation contract
    raw/<name>.json           verbatim model output, never edited
    records.base.jsonl        mechanical fields
    records.enriched.jsonl    the validated projection
  index/
    categories.json           layer 1
    categories/<slug>.json    layer 2
    components/<name>.json    layer 3
mcp/src/index.ts              the server
```
