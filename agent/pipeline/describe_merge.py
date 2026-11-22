#!/usr/bin/env python3
"""Raw describe output -> the component record.

  .describe/out/<name>.json          what an agent wrote
  agent/data/describe-raw/<name>.json    the same bytes, kept verbatim and never edited
  agent/data/records/<name>.json         the record: checked, corrected from source, with provenance

Only output that passes describe_check.py is filed. Then, per record:
  - props: a name that does not appear in the source is dropped; defaults are read
    from the destructured parameter list by regex (a model reads the type block and stops)
  - a11y.reduced_motion is set from a search of the source, not from the model
  - text that names the origin library is flagged
  - frames.best is turned into a clip time for the poster

  python3 agent/pipeline/describe_merge.py            # everything in .describe/out
  python3 agent/pipeline/describe_merge.py --report   # also print the review lists
"""
import argparse, hashlib, json, os, re, sys, datetime

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(os.path.dirname(HERE))
sys.path.insert(0, HERE)
from describe_check import check  # noqa: E402

MODEL = "deepseek-v4.1-flash"
REDUCED = re.compile(r"prefers-reduced-motion|useReducedMotion|reducedMotion|motion-reduce:|motion-safe:", re.I)


def jload(p, default=None):
    try:
        with open(p) as f:
            return json.load(f)
    except (OSError, ValueError):
        return default


def source_default(src, prop):
    m = re.search(rf"^\s{{2,}}{re.escape(prop)}\s*=\s*(.+?),?\s*$", src, re.M)
    if not m:
        return None
    val = m.group(1).strip().rstrip(",").strip()
    if val.count("(") != val.count(")") or val.count("[") != val.count("]") or val.count("{") != val.count("}"):
        return None
    return val[:60] or None


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--work", default=os.path.join(ROOT, ".describe"))
    ap.add_argument("--report", action="store_true")
    a = ap.parse_args()
    out = os.path.join(a.work, "out")
    manifest = jload(os.path.join(a.work, "manifest.json"), {})
    contract = hashlib.sha256(open(os.path.join(HERE, "describe.md"), "rb").read()).hexdigest()[:12]
    recs = {}
    for line in open(os.path.join(ROOT, "agent-index/spec/records.enriched.jsonl")):
        r = json.loads(line)
        recs[r["name"]] = r
    items = {i["name"]: i for i in jload(os.path.join(ROOT, "registry.json"))["items"]}
    raw_dir, rec_dir = os.path.join(ROOT, "agent/data/describe-raw"), os.path.join(ROOT, "agent/data/records")
    os.makedirs(raw_dir, exist_ok=True)
    os.makedirs(rec_dir, exist_ok=True)

    S = {"filed": 0, "rejected": 0, "props_kept": 0, "props_dropped": 0, "defaults_recovered": 0,
         "reduced_motion_corrected": 0, "names_library": 0, "kind_changed": 0, "kind_compared": 0}
    rejected, review = [], {"render": [], "no_interaction": [], "title_fix": [], "unsure": [], "library": [], "kind": [], "low_polish": []}
    for f in sorted(os.listdir(out)):
        if not f.endswith(".json"):
            continue
        name = f[:-5]
        raw_bytes = open(os.path.join(out, f), "rb").read()
        try:
            d = json.loads(raw_bytes)
            E, _ = check(name, d, manifest)
        except ValueError as e:
            E = [f"not valid JSON: {e}"]
        if E or name not in recs:
            S["rejected"] += 1
            rejected.append((name, (E or ["not in the index"])[0]))
            continue
        open(os.path.join(raw_dir, f), "wb").write(raw_bytes)
        base, item = recs[name], items.get(name, {})
        src = ""
        for p in [base["file"]] + [x["path"] for x in item.get("files", []) if x["path"] != base["file"]]:
            full = os.path.join(ROOT, p)
            if os.path.exists(full):
                src += open(full, errors="replace").read() + "\n"

        props = []
        for p in d["props"]:
            nm = str(p.get("name") or "").strip()
            if nm and re.search(rf"\b{re.escape(nm)}\b", src):
                dflt = source_default(src, nm)
                if dflt is not None and not p.get("default"):
                    S["defaults_recovered"] += 1
                props.append({"name": nm, "type": str(p.get("type") or "").strip() or "unknown",
                              "default": dflt if dflt is not None else p.get("default"), "required": bool(p.get("required"))})
                S["props_kept"] += 1
            else:
                S["props_dropped"] += 1
        d["props"] = props

        real_rm = bool(REDUCED.search(src))
        if d["a11y"]["reduced_motion"] != real_rm:
            S["reduced_motion_corrected"] += 1
            d["a11y"]["reduced_motion"] = real_rm

        origin = (base.get("origin") or "").strip()
        prose = " ".join(str(d[k]) for k in ("tagline", "summary", "appearance", "behaviour", "use_when", "avoid_when")) + " " + " ".join(d["search_phrases"])
        if origin and len(origin) > 3 and re.search(rf"\b{re.escape(origin)}\b", prose, re.I):
            S["names_library"] += 1
            review["library"].append(name)

        facets = jload(os.path.join(ROOT, "agent/data/facets", f"{name}.json"), {}) or {}
        best = d["frames"]["best"]
        times = facets.get("film") or []
        d["frames"]["best_time"] = times[best - 1] if best and best <= len(times) else None

        old_kind = (jload(os.path.join(ROOT, "agent/data/labels", f"{name}.json"), {}) or {}).get("kind")
        if old_kind:
            S["kind_compared"] += 1
            if old_kind != d["kind"]:
                S["kind_changed"] += 1
                review["kind"].append(f"{name}: {old_kind} -> {d['kind']}")

        m = manifest.get(name, {})
        d["title"] = base.get("title") or item.get("title") or name
        d["_meta"] = {"schema": 1, "model": MODEL, "contract": contract, "source_hash": m.get("source_hash"),
                      "film_hash": m.get("film_hash"), "frames_from": m.get("frames"),
                      "generated": datetime.date.today().isoformat()}
        json.dump(d, open(os.path.join(rec_dir, f), "w"), indent=1, ensure_ascii=False)
        S["filed"] += 1

        fr = d["frames"]
        if fr["render"] != "ok":
            review["render"].append(f"{name}: {fr['render']} ({fr['render_note']})")
        if fr["shows_interaction"] == "no":
            review["no_interaction"].append(name)
        if d["title_fix"]:
            review["title_fix"].append(f"{name}: {d['title']!r} -> {d['title_fix']!r}")
        if d["unsure"]:
            review["unsure"].append(f"{name}: {', '.join(d['unsure'])}")
        if d["polish"] <= 2:
            review["low_polish"].append(f"{name}: {d['polish']} ({d['polish_why']})")

    print(json.dumps(S, indent=1))
    for n, why in rejected[:40]:
        print(f"REJECTED {n}: {why}")
    json.dump(review, open(os.path.join(a.work, "review.json"), "w"), indent=1, ensure_ascii=False)
    if a.report:
        for k, v in review.items():
            print(f"\n== {k} ({len(v)})")
            for line in v[:60]:
                print("  " + line)


if __name__ == "__main__":
    main()
