#!/usr/bin/env python3
"""Pack components into shards for the Haiku generation agents.

Packed by SOURCE BYTES, not by count, so no shard can overflow a context window
however the file sizes fall. Sorted by category first, so a shard is mostly one
category — an agent writing 40 buttons in sequence differentiates them from each
other, which is exactly where blurbs have to work hardest.
"""
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
SPEC = ROOT / "agent-index" / "spec"
SHARDS = SPEC / "shards"

BYTE_BUDGET = 200_000   # source+demo bytes an agent reads per shard
MAX_ITEMS = 45          # cap round-trips so an agent never loses the thread


def main() -> None:
    recs = [json.loads(l) for l in (SPEC / "records.base.jsonl").open()]
    recs.sort(key=lambda r: (r["category"], r["name"]))

    SHARDS.mkdir(parents=True, exist_ok=True)
    for old in SHARDS.glob("*.json"):
        old.unlink()

    shards, cur, cur_bytes = [], [], 0
    for r in recs:
        demo_path = str(Path(r["file"]).with_suffix("")) + ".demo.tsx"
        size = r["_src_bytes"] + len(r["usage"] or "")
        if cur and (cur_bytes + size > BYTE_BUDGET or len(cur) >= MAX_ITEMS):
            shards.append(cur)
            cur, cur_bytes = [], 0
        cur.append({
            "name": r["name"],
            "title": r["title"],
            "category": r["category"],
            "file": r["file"],
            "demo": demo_path if (ROOT / demo_path).exists() else None,
            "known_exports": r["exports"],
        })
        cur_bytes += size
    if cur:
        shards.append(cur)

    for i, items in enumerate(shards, 1):
        sid = f"s{i:02d}"
        cats = sorted({x["category"] for x in items})
        (SHARDS / f"{sid}.json").write_text(json.dumps(
            {"shard_id": sid, "categories": cats, "count": len(items), "components": items},
            indent=1, ensure_ascii=False))

    total = sum(len(s) for s in shards)
    print(f"{len(shards)} shards, {total} components")
    print(f"  per shard: min={min(len(s) for s in shards)} max={max(len(s) for s in shards)}")
    assert total == len(recs), f"lost components: {total} != {len(recs)}"
    print(f"  -> {SHARDS}")


if __name__ == "__main__":
    main()
