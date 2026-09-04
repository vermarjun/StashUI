#!/usr/bin/env python3
"""base (mechanical) + raw (generated) -> records.enriched.jsonl

The raw files are never edited. Everything here is a *projection*: truncation,
vocabulary coercion and prop verification happen at merge time, so changing any
of those rules later costs nothing but a re-run of this script.
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

CAPS = {"blurb": 80, "description": 240, "use_when": 120, "avoid_when": 120, "a11y": 200}


def source_default(src: str, prop: str) -> str | None:
    """Read a prop's default out of the destructured parameter list.

    Models reliably read the type block (which has no defaults) and stop, so this
    is mechanical rather than generated. Only ever consulted for a prop name that
    is already known to exist.
    """
    m = re.search(rf"^\s{{2,}}{re.escape(prop)}\s*=\s*(.+?),?\s*$", src, re.M)
    if not m:
        return None
    val = m.group(1).strip().rstrip(",").strip()
    # a multi-line default (object/array literal spanning lines) — not worth guessing
    if val.count("(") != val.count(")") or val.count("[") != val.count("]") or val.count("{") != val.count("}"):
        return None
    return val[:60] or None


def clip(v, cap):
    v = (v or "").strip()
    if len(v) <= cap:
        return v
    cut = v[:cap].rsplit(" ", 1)[0]
    return cut.rstrip(",;:.") + "…"


def coerce_traits(t: dict) -> dict:
    t = t or {}
    trig = [x for x in (t.get("trigger") or []) if x in TRIGGER][:3]
    aff = [x for x in (t.get("affects") or []) if x in AFFECTS][:3]
    return {
        "trigger": trig or ["always"],
        "motion": t.get("motion") if t.get("motion") in MOTION else "none",
        "affects": aff or ["fill"],
        "tone": t.get("tone") if t.get("tone") in TONE else "minimal",
        "theme": t.get("theme") if t.get("theme") in THEME else "both",
        "needs_sized_parent": bool(t.get("needs_sized_parent")),
    }


def main() -> None:
    base = [json.loads(l) for l in (SPEC / "records.base.jsonl").open()]
    out = SPEC / "records.enriched.jsonl"
    stats = {"generated": 0, "no_raw": 0, "props_dropped": 0, "clipped": 0,
             "defaults_recovered": 0, "empty_blurb": 0}

    with out.open("w") as fh:
        for r in base:
            f = RAW / f"{r['name']}.json"
            g = {}
            if f.exists():
                try:
                    g = json.loads(f.read_text())
                    stats["generated"] += 1
                except json.JSONDecodeError:
                    g = {}
            if not g:
                stats["no_raw"] += 1
            elif not (g.get("blurb") or "").strip():
                stats["empty_blurb"] += 1

            for fld, cap in CAPS.items():
                v = clip(g.get(fld), cap)
                if g.get(fld) and len(g[fld].strip()) > cap:
                    stats["clipped"] += 1
                r[fld] = v

            # a prop name that is not in the source did not come from the source
            src = (ROOT / r["file"]).read_text(encoding="utf-8", errors="replace")
            props = []
            for p in (g.get("props") or []):
                nm = (p.get("name") or "").strip()
                if nm and re.search(rf"\b{re.escape(nm)}\b", src):
                    dflt = source_default(src, nm) or p.get("default")
                    if dflt is not None and not p.get("default"):
                        stats["defaults_recovered"] += 1
                    props.append({"name": nm, "type": (p.get("type") or "").strip() or "unknown",
                                  "default": dflt, "required": bool(p.get("required"))})
                else:
                    stats["props_dropped"] += 1
            r["props"] = props
            r["traits"] = coerce_traits(g.get("traits"))
            r["slot_hints"] = [s for s in (g.get("slot_hints") or []) if s in SLOTS][:4]
            r.pop("_src_bytes", None)
            fh.write(json.dumps(r, ensure_ascii=False) + "\n")

    print(f"wrote {out}  ({len(base)} records)")
    for k, v in stats.items():
        print(f"  {k:16} {v}")


if __name__ == "__main__":
    main()
