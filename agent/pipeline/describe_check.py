#!/usr/bin/env python3
"""Check raw describe output against the contract. Agents run this on their own shard.

  python3 agent/pipeline/describe_check.py --shard .describe/shards/shard-003.txt
  python3 agent/pipeline/describe_check.py name1 name2
  python3 agent/pipeline/describe_check.py            # everything in out/

Prints one line per problem and exits 1 if any file is missing or wrong.
ERROR lines must be fixed. WARN lines are style problems worth a second look.
"""
import argparse, json, os, re, sys

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(os.path.dirname(HERE))
V = json.load(open(os.path.join(HERE, "describe-vocab.json")))
KINDS = {k["id"] for k in json.load(open(os.path.join(HERE, "kinds.json")))["kinds"]}
CAPS = V["caps"]
KEYS = ["name", "frames", "tagline", "summary", "title_fix", "appearance", "behaviour", "parts",
        "demo_content", "states", "kind", "look", "tone", "search_phrases", "resembles", "use_when",
        "avoid_when", "suits", "slot_hints", "traits", "content_from", "customise", "technique",
        "weight", "weight_why", "responsive", "a11y", "props", "issues", "polish", "polish_why", "unsure"]
HYPE = re.compile(r"\b(beautiful|sleek|stunning|elegant|gorgeous|modern|seamless|cutting[- ]edge|eye[- ]catching)\b", re.I)


def check(name, d, manifest):
    E, W = [], []

    def text(path, val, cap=None, empty_ok=False):
        if not isinstance(val, str):
            E.append(f"{path}: must be a string")
            return
        if not val.strip() and not empty_ok:
            E.append(f"{path}: is empty")
        cap = cap or CAPS.get(path)
        if cap and len(val) > cap:
            E.append(f"{path}: {len(val)} characters, limit {cap}. Rewrite it shorter, do not cut it off mid-sentence")

    def one(path, val, allowed):
        if val not in allowed:
            E.append(f"{path}: {val!r} is not allowed. Use one of: {' '.join(sorted(map(str, allowed)))}")

    def many(path, val, allowed, lo, hi):
        if not isinstance(val, list):
            E.append(f"{path}: must be a list")
            return
        bad = [x for x in val if x not in allowed]
        if bad:
            E.append(f"{path}: {bad} not allowed. Use only: {' '.join(sorted(allowed))}")
        if not lo <= len(val) <= hi:
            E.append(f"{path}: has {len(val)} values, needs {lo} to {hi}")

    if not isinstance(d, dict):
        return ["the file must hold one JSON object"], W
    missing, extra = [k for k in KEYS if k not in d], [k for k in d if k not in KEYS]
    if missing:
        E.append(f"missing keys: {', '.join(missing)}")
    if extra:
        E.append(f"unknown keys (remove them): {', '.join(extra)}")
    if missing:
        return E, W
    if d["name"] != name:
        E.append(f"name: is {d['name']!r}, must be {name!r}")

    f = d["frames"] if isinstance(d["frames"], dict) else {}
    n_frames = {"film": 6, "poster": 1, "none": 0}.get((manifest.get(name) or {}).get("frames"), 6)
    for k in ("code", "best", "best_why", "usable", "render", "render_note", "shows_interaction"):
        if k not in f:
            E.append(f"frames.{k}: missing")
    if not E:
        want = (manifest.get(name) or {}).get("code")
        if name in manifest and str(f["code"] or "") != str(want or ""):
            E.append("frames.code: does not match the code printed at the bottom right of the image. Open the image and read it"
                     if want else "frames.code: must be null, this component has no image")
        one("frames.render", f["render"], V["render"])
        one("frames.shows_interaction", f["shows_interaction"], V["shows_interaction"])
        text("frames.best_why", f["best_why"], empty_ok=f["best"] is None)
        text("frames.render_note", f["render_note"], empty_ok=True)
        if f["best"] is not None and (not isinstance(f["best"], int) or not 1 <= f["best"] <= max(n_frames, 1)):
            E.append(f"frames.best: must be a frame number 1 to {max(n_frames, 1)}, or null")
        if not isinstance(f["usable"], list) or any(not isinstance(x, int) or not 1 <= x <= max(n_frames, 1) for x in f["usable"]):
            E.append(f"frames.usable: must be a list of frame numbers 1 to {max(n_frames, 1)}")
        elif f["best"] is not None and f["best"] not in f["usable"]:
            E.append("frames.best: must also appear in frames.usable")
        if f["render"] != "ok" and not str(f["render_note"]).strip():
            E.append("frames.render_note: say what is wrong when render is not ok")
        if f["best"] is None and f["render"] == "ok":
            E.append("frames.best: is null but render is ok. Pick a frame")

    for k in ("tagline", "summary", "appearance", "behaviour", "use_when", "avoid_when", "customise", "weight_why", "polish_why"):
        text(k, d[k])
    text("demo_content", d["demo_content"], empty_ok=True)
    if d["title_fix"] is not None:
        text("title_fix", d["title_fix"])
    for k in ("tagline", "summary", "appearance", "behaviour"):
        if isinstance(d[k], str) and HYPE.search(d[k]):
            W.append(f"{k}: sales word {HYPE.search(d[k]).group(0)!r}. Describe, do not sell")
    if isinstance(d["tagline"], str) and re.match(r"^(a|an|the)\b.*\b(component|button|card)\b", d["tagline"], re.I) and "that" in d["tagline"].lower():
        W.append("tagline: reads like 'a X that ...'. Lead with the verb or the visual")
    if isinstance(d["tagline"], str) and re.search(r"this component|a component that", d["tagline"], re.I):
        E.append("tagline: must not say 'this component' or 'a component that'")

    if not isinstance(d["parts"], list) or not 2 <= len(d["parts"]) <= 8 or any(not isinstance(p, str) or len(p) > 30 for p in d["parts"]):
        E.append("parts: 2 to 8 short nouns, each at most 30 characters")
    many("states", d["states"], set(V["states"]), 0, 13)
    one("kind", d["kind"], KINDS)
    many("look", d["look"], set(V["look"]), 3, 5)
    one("tone", d["tone"], V["tone"])

    sp = d["search_phrases"]
    if not isinstance(sp, list) or len(sp) != 8 or any(not isinstance(p, str) for p in sp):
        E.append("search_phrases: exactly 8 strings")
    else:
        for p in sp:
            n = len(p.split())
            if not 2 <= n <= 9:
                E.append(f"search_phrases: {p!r} has {n} words, needs 2 to 9")
            if p != p.lower():
                E.append(f"search_phrases: {p!r} must be lower case")
        if len(set(sp)) != 8:
            E.append("search_phrases: contains duplicates")
        slug = name.lower().replace("-ts-tw", "")
        if len(slug) > 5 and any(slug in p.replace(" ", "-") or slug.replace("-", " ") in p for p in sp) and not slug.startswith("comp"):
            W.append("search_phrases: one of them is just the component's name. Use other words")
        firsts = [p.split()[0] for p in sp]
        if max(firsts.count(w) for w in firsts) > 3:
            W.append("search_phrases: more than 3 start with the same word. Vary them")

    if not isinstance(d["resembles"], list) or len(d["resembles"]) > 3 or any(not isinstance(r, str) or len(r) > 40 for r in d["resembles"]):
        E.append("resembles: 0 to 3 strings of at most 40 characters")
    many("suits", d["suits"], set(V["suits"]), 1, 3)
    many("slot_hints", d["slot_hints"], set(V["slot_hints"]), 1, 4)

    t = d["traits"] if isinstance(d["traits"], dict) else {}
    if set(t) != {"trigger", "motion", "affects", "theme", "needs_sized_parent"}:
        E.append("traits: needs exactly trigger, motion, affects, theme, needs_sized_parent")
    else:
        many("traits.trigger", t["trigger"], set(V["trigger"]), 1, 3)
        one("traits.motion", t["motion"], V["motion"])
        many("traits.affects", t["affects"], set(V["affects"]), 1, 3)
        one("traits.theme", t["theme"], V["theme"])
        if not isinstance(t["needs_sized_parent"], bool):
            E.append("traits.needs_sized_parent: true or false")

    one("content_from", d["content_from"], V["content_from"])
    many("technique", d["technique"], set(V["technique"]), 1, 3)
    one("weight", d["weight"], V["weight"])
    one("responsive", d["responsive"], V["responsive"])

    a = d["a11y"] if isinstance(d["a11y"], dict) else {}
    if set(a) != {"keyboard", "focus_visible", "labels", "reduced_motion", "note"}:
        E.append("a11y: needs exactly keyboard, focus_visible, labels, reduced_motion, note")
    else:
        one("a11y.keyboard", a["keyboard"], V["a11y_keyboard"])
        one("a11y.focus_visible", a["focus_visible"], V["a11y_focus_visible"])
        one("a11y.labels", a["labels"], V["a11y_labels"])
        if not isinstance(a["reduced_motion"], bool):
            E.append("a11y.reduced_motion: true or false")
        text("a11y.note", a["note"])

    if not isinstance(d["props"], list) or len(d["props"]) > 12:
        E.append("props: a list of at most 12")
    else:
        for p in d["props"]:
            if not isinstance(p, dict) or set(p) != {"name", "type", "default", "required"}:
                E.append("props: every entry needs exactly name, type, default, required")
                break
    if not isinstance(d["issues"], list) or len(d["issues"]) > 4 or any(not isinstance(i, str) or len(i) > 120 for i in d["issues"]):
        E.append("issues: 0 to 4 strings of at most 120 characters")
    if d["polish"] not in (1, 2, 3, 4, 5):
        E.append("polish: an integer 1 to 5")
    if not isinstance(d["unsure"], list) or any(not isinstance(u, str) or len(u) > 40 for u in d["unsure"]):
        E.append("unsure: a list of field names from this record (for example \"kind\" or \"traits.theme\")")
    return E, W


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("names", nargs="*")
    ap.add_argument("--shard")
    ap.add_argument("--work", default=os.path.join(ROOT, ".describe"))
    ap.add_argument("--quiet", action="store_true", help="print only the totals")
    a = ap.parse_args()
    out = os.path.join(a.work, "out")
    try:
        manifest = json.load(open(os.path.join(a.work, "manifest.json")))
    except (OSError, ValueError):
        manifest = {}
    names = a.names or ([l.strip() for l in open(a.shard) if l.strip()] if a.shard
                        else sorted(f[:-5] for f in os.listdir(out) if f.endswith(".json")))
    bad = warned = 0
    for n in names:
        p = os.path.join(out, f"{n}.json")
        if not os.path.exists(p):
            E, W = ["no output file yet"], []
        else:
            try:
                E, W = check(n, json.load(open(p)), manifest)
            except ValueError as e:
                E, W = [f"not valid JSON: {e}"], []
        bad += bool(E)
        warned += bool(W)
        if not a.quiet:
            for m in E:
                print(f"ERROR {n}: {m}")
            for m in W:
                print(f"WARN  {n}: {m}")
    print(f"{len(names) - bad} of {len(names)} pass" + (f", {bad} with errors" if bad else "") + (f", {warned} with warnings" if warned else ""))
    sys.exit(1 if bad else 0)


if __name__ == "__main__":
    main()
