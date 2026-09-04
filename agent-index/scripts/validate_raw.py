#!/usr/bin/env python3
"""Check every generated record against the contract in spec/PROMPT.md.

Reports what is missing and what is malformed, so a repair run only touches the
components that actually failed. Exits 1 if anything is wrong.
"""
import json, re, sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
SPEC = ROOT / "agent-index" / "spec"
RAW = SPEC / "raw"

TRIGGER = {"always","hover","click","focus","scroll","viewport","pointer-move","drag","timer","keyboard"}
MOTION  = {"none","subtle","pronounced","continuous"}
AFFECTS = {"fill","border","text","shadow","background","layout","cursor","children","image"}
TONE    = {"minimal","decorative","playful","technical","dramatic"}
THEME   = {"light","dark","both"}
SLOTS   = {"page-background","section-background","hero","headline","body-text",
           "primary-cta","secondary-cta","nav","sidebar","footer",
           "feature-card","pricing-card","testimonial","logo-wall","stat",
           "form-field","form-submit","modal","toast","tooltip",
           "badge","avatar","media","data-table","list-item",
           "loading","empty-state","decoration","divider","chart"}
# `name` is deliberately NOT required: the filename is authoritative and the merge
# step keys on it, so a record that omits the field is still complete.
REQUIRED = {"blurb","description","use_when","avoid_when","a11y","props","traits","slot_hints"}


def check(rec_base: dict) -> tuple[str, list[str]]:
    name = rec_base["name"]
    f = RAW / f"{name}.json"
    if not f.exists():
        return "missing", []
    try:
        g = json.loads(f.read_text())
    except json.JSONDecodeError as e:
        return "unparseable", [str(e)[:60]]

    warn = []
    if missing := REQUIRED - set(g):
        return "incomplete", [f"missing keys: {sorted(missing)}"]

    b = (g.get("blurb") or "").strip()
    if not b:
        warn.append("blurb:empty")
    elif len(b) > 100:
        warn.append(f"blurb:{len(b)}chars")
    elif b.lower().startswith(rec_base["title"].lower()):
        warn.append("blurb:restates-title")
    elif rec_base["origin"].lower() in b.lower():
        warn.append("blurb:names-library")

    for fld, cap in (("description",280),("use_when",150),("avoid_when",150),("a11y",240)):
        v = (g.get(fld) or "").strip()
        if not v:
            warn.append(f"{fld}:empty")
        elif len(v) > cap:
            warn.append(f"{fld}:{len(v)}chars")

    src = (ROOT / rec_base["file"]).read_text(encoding="utf-8", errors="replace")
    bad = [p.get("name") for p in (g.get("props") or [])
           if not (p.get("name") and re.search(rf"\b{re.escape(p['name'])}\b", src))]
    if bad:
        warn.append(f"props-not-in-source:{','.join(str(x) for x in bad[:3])}")

    t = g.get("traits") or {}
    if not set(t.get("trigger") or []) <= TRIGGER: warn.append(f"trigger:{t.get('trigger')}")
    if t.get("motion") not in MOTION:              warn.append(f"motion:{t.get('motion')}")
    if not set(t.get("affects") or []) <= AFFECTS: warn.append(f"affects:{t.get('affects')}")
    if t.get("tone") not in TONE:                  warn.append(f"tone:{t.get('tone')}")
    if t.get("theme") not in THEME:                warn.append(f"theme:{t.get('theme')}")
    if not isinstance(t.get("needs_sized_parent"), bool): warn.append("needs_sized_parent")
    if not set(g.get("slot_hints") or []) <= SLOTS:
        warn.append(f"slots:{sorted(set(g.get('slot_hints') or []) - SLOTS)}")

    return ("ok" if not warn else "warn"), warn


def main() -> None:
    base = [json.loads(l) for l in (SPEC / "records.base.jsonl").open()]
    buckets: dict[str, list] = {}
    detail = []
    for r in base:
        status, warn = check(r)
        buckets.setdefault(status, []).append(r["name"])
        if warn:
            detail.append((r["name"], warn))

    total = len(base)
    for k in ("ok", "warn", "missing", "unparseable", "incomplete"):
        if k in buckets:
            print(f"{k:12} {len(buckets[k]):5}  ({100*len(buckets[k])//total}%)")

    if detail:
        print(f"\nwarnings ({len(detail)}), first 25:")
        for n, w in detail[:25]:
            print(f"  {n:34} {'; '.join(w)}")

    broken = sum(len(buckets.get(k, [])) for k in ("missing", "unparseable", "incomplete"))
    if broken:
        (SPEC / "repair.txt").write_text("\n".join(
            n for k in ("missing", "unparseable", "incomplete") for n in buckets.get(k, [])))
        print(f"\n{broken} need regeneration -> spec/repair.txt")
        sys.exit(1)
    print("\nall components present and parseable")


if __name__ == "__main__":
    main()
