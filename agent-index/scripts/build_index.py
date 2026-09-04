#!/usr/bin/env python3
"""records.enriched.jsonl -> the on-disk index the MCP server and CLI both read.

    agent-index/index/
      categories.json          L1  32 categories, what is in each, see-also
      categories/<slug>.json   L2  every component in one category, one row each
      components/<name>.json   L3  one component, everything but the source

One file per node, and no file holds the whole tree — so a tool call reads exactly
what it answers with, and nothing can be loaded whole by accident.
"""
import json, shutil
from collections import Counter, defaultdict
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
SPEC = ROOT / "agent-index" / "spec"
INDEX = ROOT / "agent-index" / "index"

# hand-written routing hints; regenerable, category-level only (never per component)
SEE_ALSO = {
    "buttons": ["borders", "effects"], "backgrounds": ["gradients", "effects"],
    "gradients": ["backgrounds", "borders"], "effects": ["backgrounds", "text", "cards"],
    "cards": ["effects", "borders"], "text": ["effects", "heroes"],
    "heroes": ["backgrounds", "text", "buttons"], "navigation": ["misc", "modals"],
    "modals": ["navigation", "notifications"], "inputs": ["selects", "checkboxes", "forms"],
    "selects": ["inputs", "modals"], "checkboxes": ["inputs", "sliders"],
    "notifications": ["modals", "badges"], "borders": ["effects", "gradients"],
    "tooltips": ["modals", "badges"], "carousels": ["media", "cards"],
    "media": ["carousels", "effects"], "data-display": ["tables", "misc"],
    "tables": ["data-display", "misc"], "loaders": ["misc", "effects"],
    "avatars": ["badges", "misc"], "badges": ["avatars", "notifications"],
    "sliders": ["inputs", "checkboxes"], "calendar": ["inputs", "selects"],
    "file-upload": ["inputs", "forms"], "forms": ["inputs", "form-field"],
    "testimonials": ["cards", "avatars"], "pricing": ["cards", "tables"],
    "footers": ["navigation", "misc"], "accordions": ["modals", "data-display"],
    "misc": ["data-display"], "dashboards": ["data-display", "navigation"],
}


def row(r: dict) -> dict:
    """The layer-2 row: everything needed to shortlist, nothing more."""
    t = r["traits"]
    flags = []
    if not r["npm_deps"]:
        flags.append("pure")
    if "motion" in r["flags"]:
        flags.append("motion")
    for f in ("webgl", "canvas", "3d", "heavy"):
        if f in r["flags"]:
            flags.append(f)
    if t["needs_sized_parent"]:
        flags.append("sized-parent")
    if r["hardcoded_colors"]:
        flags.append(f"{r['hardcoded_colors']}c")
    if r["alternatives"]:
        flags.append(f"{len(r['alternatives'])+1} ports")
    return {
        "name": r["name"], "title": r["title"], "origin": r["origin_short"],
        "blurb": r["blurb"], "trigger": t["trigger"], "tone": t["tone"],
        "slots": r["slot_hints"], "flags": flags,
    }


def main() -> None:
    recs = [json.loads(l) for l in (SPEC / "records.enriched.jsonl").open()]
    summaries = {}
    f = SPEC / "category_summaries.json"
    if f.exists():
        summaries = json.loads(f.read_text())

    if INDEX.exists():
        shutil.rmtree(INDEX)
    (INDEX / "categories").mkdir(parents=True)
    (INDEX / "components").mkdir(parents=True)

    by_cat = defaultdict(list)
    for r in recs:
        by_cat[r["category"]].append(r)

    cats = []
    for slug, items in sorted(by_cat.items(), key=lambda kv: -len(kv[1])):
        items.sort(key=lambda r: r["name"])
        slots = Counter(s for r in items for s in r["slot_hints"])
        cats.append({
            "slug": slug, "count": len(items),
            "summary": summaries.get(slug, ""),
            "common_slots": [s for s, _ in slots.most_common(4)],
            "see_also": [s for s in SEE_ALSO.get(slug, []) if s in by_cat],
        })
        (INDEX / "categories" / f"{slug}.json").write_text(json.dumps({
            "slug": slug, "count": len(items),
            "summary": summaries.get(slug, ""),
            "components": [row(r) for r in items],
        }, ensure_ascii=False, indent=1))

    (INDEX / "categories.json").write_text(json.dumps({
        "total": len(recs), "categories": cats,
    }, ensure_ascii=False, indent=1))

    for r in recs:
        (INDEX / "components" / f"{r['name']}.json").write_text(
            json.dumps(r, ensure_ascii=False, indent=1))

    sizes = sorted((INDEX / "categories" / f"{c['slug']}.json").stat().st_size for c in cats)
    print(f"index built: {len(cats)} categories, {len(recs)} components")
    print(f"  categories.json      {(INDEX/'categories.json').stat().st_size/1024:.1f} KB")
    print(f"  category files       median {sizes[len(sizes)//2]/1024:.1f} KB, "
          f"largest {sizes[-1]/1024:.1f} KB")
    csz = sorted(p.stat().st_size for p in (INDEX / "components").glob("*.json"))
    print(f"  component files      median {csz[len(csz)//2]/1024:.1f} KB, "
          f"largest {csz[-1]/1024:.1f} KB")


if __name__ == "__main__":
    main()
