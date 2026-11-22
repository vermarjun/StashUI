#!/usr/bin/env python3
"""Build what a describing agent reads for each component.

For every component this writes, under the work directory (default .describe/):

  in/<name>.jpg   the six film frames, numbered 1-6, on one sheet (1456x608)
  in/<name>.md    title, catalogue description, measured facts, demo and source

and, with --shards N, shards/shard-NNN.txt listing N names each.

The film and the facts come from agent/pipeline/tiles.py; nothing here is a
model's opinion. A component without a film gets its poster as a single frame.

  python3 agent/pipeline/describe_packets.py                 # every component with no record yet
  python3 agent/pipeline/describe_packets.py --all           # everything
  python3 agent/pipeline/describe_packets.py a b c           # just these
  python3 agent/pipeline/describe_packets.py --shards 12     # also write shard lists
"""
import argparse, hashlib, json, os, sys
from PIL import Image, ImageDraw, ImageFont

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
CELL_W, CELL_H, GAP, FOOT = 480, 300, 8, 32
SRC_CAP, DEMO_CAP = 30000, 6000          # bytes of source / demo an agent is shown


def jload(p, default=None):
    try:
        with open(p) as f:
            return json.load(f)
    except (OSError, ValueError):
        return default


def frames_of(name):
    """-> (list of 480x300 RGB frames, source label)."""
    film = os.path.join(ROOT, "public/agent/film", f"{name}.webp")
    if os.path.exists(film):
        im = Image.open(film).convert("RGB")
        return [im.crop((c * CELL_W, r * CELL_H, (c + 1) * CELL_W, (r + 1) * CELL_H))
                for r in range(2) for c in range(3)], "film"
    for p in (f"public/previews/poster/{name}.webp", f"public/previews/{name}.jpg"):
        p = os.path.join(ROOT, p)
        if os.path.exists(p):
            im = Image.open(p).convert("RGB")
            im.thumbnail((CELL_W, CELL_H))
            cell = Image.new("RGB", (CELL_W, CELL_H), (10, 10, 10))
            cell.paste(im, ((CELL_W - im.width) // 2, (CELL_H - im.height) // 2))
            return [cell], "poster"
    return [], "none"


def code_of(name):
    """Four digits printed on the sheet. A record must quote them, which proves the image was opened."""
    return str(int(hashlib.sha256(f"sheet:{name}".encode()).hexdigest(), 16) % 9000 + 1000)


def sheet(frames, out, code):
    cols = 3 if len(frames) > 1 else 1
    rows = (len(frames) + cols - 1) // cols
    W, H = cols * CELL_W + (cols - 1) * GAP, rows * CELL_H + (rows - 1) * GAP + FOOT
    im = Image.new("RGB", (W, H), (40, 40, 40))
    d = ImageDraw.Draw(im)
    font = ImageFont.load_default(size=26)
    for i, f in enumerate(frames):
        x, y = (i % cols) * (CELL_W + GAP), (i // cols) * (CELL_H + GAP)
        im.paste(f, (x, y))
        d.rectangle((x, y, x + 34, y + 34), fill=(255, 214, 0))
        d.text((x + 17, y + 17), str(i + 1), fill=(0, 0, 0), font=font, anchor="mm")
    d.text((W - 10, H - FOOT // 2), f"sheet code {code}", fill=(255, 214, 0),
           font=ImageFont.load_default(size=20), anchor="rm")
    im.save(out, quality=88)


def clip(text, cap):
    b = text.encode()
    if len(b) <= cap:
        return text, False
    head, tail = b[: int(cap * 0.7)].decode(errors="ignore"), b[-int(cap * 0.25):].decode(errors="ignore")
    return f"{head}\n\n/* ... {len(b) - cap} bytes omitted from the middle ... */\n\n{tail}", True


def source_of(item, rec):
    """Main file first, then the item's other files, capped overall."""
    paths = [rec["file"]] + [f["path"] for f in item.get("files", []) if f["path"] != rec["file"]]
    parts, used, digest = [], 0, hashlib.sha256()
    for p in paths:
        full = os.path.join(ROOT, p)
        if not os.path.exists(full) or p.endswith(".demo.tsx"):
            continue
        raw = open(full, errors="ignore").read()
        digest.update(raw.encode())
        room = SRC_CAP - used
        if room < 1500:
            parts.append(f"### {p}\n(not shown: {len(raw)} bytes)")
            continue
        body, cut = clip(raw, room)
        used += len(body.encode())
        parts.append(f"### {p}{' (truncated)' if cut else ''}\n```tsx\n{body}\n```")
    return "\n\n".join(parts), digest.hexdigest()[:16]


def packet(name, rec, item, cat, facets, out_dir):
    frames, src = frames_of(name)
    if frames:
        sheet(frames, os.path.join(out_dir, f"{name}.jpg"), code_of(name))
    L = [f"# {name}", "", f"title: {rec.get('title') or item.get('title') or name}",
         f"catalogue description: {item.get('description') or '(none)'}",
         f"origin library (never mention it in your output): {rec.get('origin') or 'unknown'}"]
    if cat and cat.get("kind"):
        L.append(f"kind from an earlier pass, made from one small still (confirm or correct it): {cat['kind']}")
    L += ["", "## Frames"]
    if src == "film":
        times = (facets or {}).get("film") or []
        L.append(f"{name}.jpg holds 6 frames from the recorded clip, numbered 1 to 6 in time order"
                 + (f" (at {', '.join(str(t) + 's' for t in times)} of {facets.get('duration')}s)." if times else "."))
        L.append("All six share one crop around the component. The mouse pointer in a frame is the recording's cursor.")
        L.append("A four-digit sheet code is printed in yellow at the bottom right of the image. Copy it into frames.code.")
    elif src == "poster":
        L.append(f"{name}.jpg holds ONE still only; no clip exists. Set frames.best to 1 and judge motion from the code.")
        L.append("A four-digit sheet code is printed in yellow at the bottom right of the image. Copy it into frames.code.")
    else:
        L.append("No image exists for this component. Set frames.code and frames.best to null, frames.usable to [], "
                 "frames.render to \"blank\" with render_note \"no image\", and describe from the code.")
    if facets:
        w, h = facets.get("size", [0, 0])
        L += ["", "## Measured from the clip (facts, not guesses)",
              f"- footprint: {w}x{h} px on a 1120x700 stage" + (" (full-bleed: fills the stage)" if facets.get("bleed") else ""),
              f"- change between frames: {facets.get('motion')} (0 = static, above 3 = a lot)",
              f"- vivid colours: {', '.join(facets.get('accents') or []) or 'none'}; share of vivid pixels {facets.get('vivid')}",
              f"- stage colour {facets.get('stage')}, mean luminance {facets.get('luminance')} (0 dark, 1 light)"]
    L += ["", "## Integration facts",
          f"- npm dependencies: {', '.join(rec.get('npm_deps') or []) or 'none'}",
          f"- other registry components it needs: {', '.join(rec.get('registry_deps') or []) or 'none'}",
          f"- exports: {', '.join(rec.get('exports') or []) or 'unknown'}",
          f"- hardcoded colours found by scan: {rec.get('hardcoded_colors', 'unknown')}"]
    demo, _ = clip(rec.get("usage") or "", DEMO_CAP)
    L += ["", "## Demo (how it is used in the recording)", "```tsx", demo or "(no demo)", "```"]
    body, digest = source_of(item, rec)
    L += ["", "## Source", body or "(source not found)"]
    open(os.path.join(out_dir, f"{name}.md"), "w").write("\n".join(L) + "\n")
    return {"name": name, "frames": src, "code": code_of(name) if frames else None, "source_hash": digest,
            "film_hash": hashlib.sha256(open(os.path.join(out_dir, f"{name}.jpg"), "rb").read()).hexdigest()[:16] if frames else None}


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("names", nargs="*")
    ap.add_argument("--all", action="store_true")
    ap.add_argument("--work", default=os.path.join(ROOT, ".describe"))
    ap.add_argument("--shards", type=int, default=0, help="also write shard lists of this many names")
    ap.add_argument("--prefix", default="shard", help="shard file name prefix")
    ap.add_argument("--skip-done", action="store_true", help="leave out names that already have output in <work>/out")
    a = ap.parse_args()

    recs = {}
    for line in open(os.path.join(ROOT, "agent-index/spec/records.enriched.jsonl")):
        r = json.loads(line)
        recs[r["name"]] = r
    items = {i["name"]: i for i in jload(os.path.join(ROOT, "registry.json"))["items"]}
    cat = {i["name"]: i for i in (jload(os.path.join(ROOT, "public/agent/catalog.json")) or {"items": []})["items"]}
    done = {f[:-5] for f in os.listdir(os.path.join(ROOT, "agent/data/records"))} \
        if os.path.isdir(os.path.join(ROOT, "agent/data/records")) else set()

    names = a.names or [n for n in recs if a.all or n not in done]
    if a.skip_done:
        names = [n for n in names if not os.path.exists(os.path.join(a.work, "out", f"{n}.json"))]
    unknown = [n for n in names if n not in recs]
    if unknown:
        sys.exit(f"not in the index: {', '.join(unknown)}")
    out_dir = os.path.join(a.work, "in")
    os.makedirs(out_dir, exist_ok=True)
    os.makedirs(os.path.join(a.work, "out"), exist_ok=True)
    manifest = jload(os.path.join(a.work, "manifest.json"), {})
    for n in names:
        manifest[n] = packet(n, recs[n], items.get(n, {}), cat.get(n), jload(os.path.join(ROOT, "agent/data/facets", f"{n}.json")), out_dir)
    json.dump(manifest, open(os.path.join(a.work, "manifest.json"), "w"), indent=0)
    by = {}
    for n in names:
        by[manifest[n]["frames"]] = by.get(manifest[n]["frames"], 0) + 1
    print(f"{len(names)} packets in {out_dir}  ({', '.join(f'{k}: {v}' for k, v in by.items())})")

    if a.shards:
        sd = os.path.join(a.work, "shards")
        os.makedirs(sd, exist_ok=True)
        # neighbours in the index share a category, so a shard sees real siblings
        order = [n for n in recs if n in set(names)]
        for i in range(0, len(order), a.shards):
            open(os.path.join(sd, f"{a.prefix}-{i // a.shards:03d}.txt"), "w").write("\n".join(order[i:i + a.shards]) + "\n")
        print(f"{(len(order) + a.shards - 1) // a.shards} shards of up to {a.shards} in {sd}")


if __name__ == "__main__":
    main()
