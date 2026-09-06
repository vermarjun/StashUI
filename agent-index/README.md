# agent-index — the retrieval layer

This directory turns 1518 components into something an agent can actually use. The
gallery is for people; this is for the thing that will be writing the UI.

The interface is the **MCP server** in `mcp/`. This directory holds the data it serves
and the pipeline that builds it.

## Why it is shaped this way

A design system only pays off if the thing consuming it can *find* the right piece.
The obvious answers are all bad at this size:

| Approach | What goes wrong |
| --- | --- |
| Put the catalogue in the tool schema | Works at 89 components (this is what Razorpay's Blade MCP does, correctly). At 1518 it neither fits nor helps once it does. |
| Paste `registry.json` into context | 780KB. The model reads 200× what it needs, and answers get *worse* as the window fills. |
| `grep` the registry | Matches words, not intent. "Something calm for a fintech hero" matches nothing. |
| Embed it in a vector store | Unstructured chunks, no hierarchy, no way to ask "what else is like this", and no auditable reason a result came back. Plus an index to rebuild, a service to run, a key to hold. |

So retrieval is **navigation**: a table of contents where every node carries a summary,
descended the way a person opens a reference book. Four layers, each answering one
question:

```
stashui_categories()          which category?      ~1,750 tokens
stashui_category(slug, …)     which component?     350 – 4,800 tokens
stashui_component(name)       is this the one?     ~430 tokens
stashui_code(name)            how is it built?     on request only
```

Every response is read from one file, and no file holds the whole tree.

## Choosing among 97 buttons

The question this exists to answer. Only two of the five steps are the model reading
prose:

1. Category summaries route it to `buttons`; `see also` catches the ambiguous case.
2. **Filters cut 97 → 6 mechanically**, before anything is read:
   `stashui_category("buttons", trigger="hover", tone="minimal", clean_only=true)`
   returns ~356 tokens instead of ~2,800.
3. Blurbs separate those 6 by what they visibly do.
4. `use_when` / `avoid_when` decide between the last two.
5. When two candidates are the *same* component ported by different libraries — 192
   components here are — prose is useless, so `ALTERNATIVES` ranks them by integration
   cost (npm deps, then hardcoded colours to replace).

## Layout

```
spec/
  SCHEMA.md                 what each layer provides, and where every field comes from
  PROMPT.md                 the generation contract every agent follows
  raw/<name>.json           1518 verbatim model responses — never edited
  shards/sNN.json           46 byte-budgeted work units
  records.base.jsonl        mechanical fields only
  records.enriched.jsonl    the validated projection the index is built from
  category_summaries.json   31 summaries, written from the blurbs
index/
  categories.json           layer 1
  categories/<slug>.json    layer 2   (31 files)
  components/<name>.json    layer 3   (1518 files)
scripts/
  extract_records.py  make_shards.py  validate_raw.py  merge_records.py  build_index.py
```

## Rebuilding

```bash
python3 agent-index/scripts/extract_records.py
python3 agent-index/scripts/merge_records.py
python3 agent-index/scripts/build_index.py
```

Regeneration is only needed for genuinely new *information*. Everything else — output
format, truncation caps, vocabulary coercion, prop verification — lives in
`merge_records.py`, so changing it is a free re-run against the untouched `raw/` files.

Moving a component between categories is one line in `registry/categories.json` plus a
rebuild: nothing generated mentions a category.

To regenerate metadata (after adding components, or changing `PROMPT.md`):

```bash
python3 agent-index/scripts/make_shards.py
#   then one Haiku agent per shard in spec/shards/, each given PROMPT.md and its shard
python3 agent-index/scripts/validate_raw.py   # lists exactly what failed
```

## What this replaced

v1 was a five-layer tree with a `family` level between category and component, built by
clustering component names on shared tokens. Measured against the real registry, **73%
of its families were buckets named after the source library** (`Other — Origin Ui`),
covering 72% of all components — provenance, not meaning, and nothing an agent can
reason with. Leaf summaries restated the title 51% of the time and 74% of components
had no props extracted at all.

The middle layer was removed rather than repaired: the largest category renders in
4,800 tokens, so an interior node was only ever adding a hop. What replaced the
clustering is per-component metadata written from the source, and fixed-vocabulary
traits that let the server filter before the model reads.
