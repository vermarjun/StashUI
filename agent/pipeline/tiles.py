#!/usr/bin/env python3
"""Clips -> what an agent looks at.

For every public/previews/<name>.mp4 this writes

  public/agent/tiles/<name>.webp   one 480x300 still: the richest frame, cropped to the component
  public/agent/film/<name>.webp    six 480x300 frames packed 3x2 (1440x600), same crop, picked where the clip changes
  agent/data/facets/<name>.json    what was measured: crop box, real size, palette, motion, frame times

Nothing here is a model's opinion. Everything is measured from pixels, so it is
reproducible and can be re-run whenever a clip is re-recorded.

Run on the recording Mac (ffmpeg batch work):
  python3 agent/pipeline/tiles.py                # only clips newer than their tile
  python3 agent/pipeline/tiles.py --all          # everything
  python3 agent/pipeline/tiles.py name1 name2    # just these
Options: --previews DIR  --out DIR (root that holds public/ and agent/)  --jobs N
"""
import argparse, colorsys, json, os, subprocess, sys, tempfile
from concurrent.futures import ProcessPoolExecutor
import numpy as np
from PIL import Image

CELL_W, CELL_H = 480, 300          # 8:5, the clip aspect
SAMPLES = 40                       # frames decoded per clip
MIN_CROP_W = 300                   # never zoom past 480/300 = 1.6x native pixels
BLEED = 0.55                       # content covering more than this is shown uncropped
HUES = [("red", 345, 15), ("orange", 15, 45), ("yellow", 45, 70), ("green", 70, 165),
        ("teal", 165, 195), ("blue", 195, 255), ("purple", 255, 290), ("pink", 290, 345)]


def decode(src, n):
    dur = float(subprocess.check_output(
        ["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", src]))
    with tempfile.TemporaryDirectory() as t:
        subprocess.run(["ffmpeg", "-v", "error", "-i", src, "-vf", f"fps={n / dur:.4f}",
                        "-q:v", "2", f"{t}/%03d.jpg"], check=True)
        frames = [np.asarray(Image.open(f"{t}/{f}").convert("RGB")) for f in sorted(os.listdir(t))]
    return dur, frames


def border_colour(frame):
    """The stage colour: the most common colour in a thin ring around the frame."""
    h, w, _ = frame.shape
    r = max(4, h // 50)
    ring = np.concatenate([frame[:r].reshape(-1, 3), frame[-r:].reshape(-1, 3),
                           frame[:, :r].reshape(-1, 3), frame[:, -r:].reshape(-1, 3)]).astype(np.int32)
    q = ring // 8
    key = q[:, 0] * 1024 + q[:, 1] * 32 + q[:, 2]
    keys, counts = np.unique(key, return_counts=True)
    return np.median(ring[key == keys[counts.argmax()]], axis=0)


def drop_hairlines(mask):
    """Clear lines up to 4px thick that span most of the frame: capture seams, not component."""
    for axis in (1, 0):
        busy = mask.mean(axis=axis) > 0.6
        i = 0
        while i < len(busy):
            if busy[i]:
                j = i
                while j < len(busy) and busy[j]: j += 1
                if j - i <= 4:
                    if axis == 1: mask[i:j, :] = False
                    else: mask[:, i:j] = False
                i = j
            else: i += 1
    return mask


def content_box(frames, bg):
    """Where the component lives. A pixel counts when it differs from the stage in
    at least 12% of frames, which keeps menus that open briefly and drops the
    cursor passing through. Low threshold on purpose: cards are often one shade
    off the stage."""
    diff = [np.abs(f.astype(np.int16) - bg).max(axis=2) > 10 for f in frames]
    mask = drop_hairlines(np.mean(diff, axis=0) >= 0.12)
    rows, cols = np.where(mask.sum(axis=1) >= 3)[0], np.where(mask.sum(axis=0) >= 3)[0]
    if not len(rows) or not len(cols): return None, diff
    return (int(cols[0]), int(rows[0]), int(cols[-1]) + 1, int(rows[-1]) + 1), diff


def fit_crop(box, W, H):
    """Pad the box, make it 8:5, keep it inside the frame, and cap the zoom."""
    x0, y0, x1, y1 = box
    w, h = (x1 - x0) * 1.16 + 16, (y1 - y0) * 1.16 + 16
    w = max(w, MIN_CROP_W)
    if w / h < CELL_W / CELL_H: w = h * CELL_W / CELL_H
    else: h = w * CELL_H / CELL_W
    if w > W or h > H: return (0, 0, W, H)
    cx, cy = (x0 + x1) / 2, (y0 + y1) / 2
    left = min(max(cx - w / 2, 0), W - w); top = min(max(cy - h / 2, 0), H - h)
    return tuple(int(round(v)) for v in (left, top, left + w, top + h))


def palette(frame, bg):
    """Accent hues by share of saturated pixels, plus whether the piece is light or dark."""
    px = frame.reshape(-1, 3)[::7].astype(np.float32) / 255
    mx, mn = px.max(axis=1), px.min(axis=1)
    sat = np.where(mx > 0, (mx - mn) / np.maximum(mx, 1e-6), 0)
    vivid = (sat > 0.35) & (mx > 0.3)
    share = float(vivid.mean())
    hues = {}
    if vivid.any():
        hsv = np.array([colorsys.rgb_to_hsv(*p)[0] * 360 for p in px[vivid][:4000]])
        for name, lo, hi in HUES:
            inside = ((hsv >= lo) & (hsv < hi)) if lo < hi else ((hsv >= lo) | (hsv < hi))
            if inside.mean() >= 0.18: hues[name] = round(float(inside.mean()), 2)
    lum = float((0.2126 * px[:, 0] + 0.7152 * px[:, 1] + 0.0722 * px[:, 2]).mean())   # not matmul: Accelerate emits spurious warnings
    return {"accents": sorted(hues, key=hues.get, reverse=True)[:3], "vivid": round(share, 3),
            "luminance": round(lum, 3), "stage": "#%02x%02x%02x" % tuple(int(v) for v in np.clip(bg, 0, 255))}


def one(job):
    name, src, out = job
    try:
        dur, frames = decode(src, SAMPLES)
        if len(frames) < 8: return name, "too short"
        cut = max(1, len(frames) // 10)            # clips fade in and out for the loop
        kept = frames[cut:-cut]
        t0, step = cut * dur / len(frames), dur / len(frames)
        H, W, _ = kept[0].shape
        bg = border_colour(kept[len(kept) // 2])
        box, diff = content_box(kept, bg)
        if not box:                                 # nothing differs from the border: it is all stage
            box = (0, 0, W, H)
        area = (box[2] - box[0]) * (box[3] - box[1]) / (W * H)
        bleed = area > BLEED
        crop = (0, 0, W, H) if bleed else fit_crop(box, W, H)

        # frame-to-frame change inside the crop drives both the film and the motion number
        small = [np.asarray(Image.fromarray(f[crop[1]:crop[3], crop[0]:crop[2]]).resize((96, 60)).convert("L"),
                            dtype=np.int16) for f in kept]
        change = np.array([0.0] + [float(np.abs(a - b).mean()) for a, b in zip(small, small[1:])])
        total = change.sum()
        cum = np.cumsum(change) / total if total > 0 else np.linspace(0, 1, len(kept))
        picks = []
        for k in range(6):                          # equal steps of change, not of time
            i = int(np.abs(cum - k / 5).argmin())
            while i in picks and i + 1 < len(kept): i += 1
            picks.append(i)
        picks = sorted(set(picks))
        while len(picks) < 6:                       # static clip: fall back to even spacing
            picks = sorted(set(np.linspace(0, len(kept) - 1, 6).astype(int).tolist()) | set(picks))[:6]

        # the still: the frame that shows the most component (open menu, finished reveal)
        fill = [float(d[crop[1]:crop[3], crop[0]:crop[2]].mean()) for d in diff]
        hero = int(np.argmax(fill))
        # ...unless the describe pass looked at the film and named the frame that shows it best
        # (agent/pipeline/describe.md, frames.best). A re-recorded clip needs describing again.
        try:
            best = json.load(open(f"{out}/agent/data/records/{name}.json"))["frames"]["best"]
            if isinstance(best, int) and 1 <= best <= len(picks): hero = picks[best - 1]
        except (OSError, ValueError, KeyError, TypeError):
            pass

        def cell(i):
            return Image.fromarray(kept[i]).crop(crop).resize((CELL_W, CELL_H), Image.LANCZOS)

        os.makedirs(f"{out}/public/agent/tiles", exist_ok=True)
        os.makedirs(f"{out}/public/agent/film", exist_ok=True)
        os.makedirs(f"{out}/agent/data/facets", exist_ok=True)
        cell(hero).save(f"{out}/public/agent/tiles/{name}.webp", quality=78, method=6)
        strip = Image.new("RGB", (CELL_W * 3, CELL_H * 2))
        for k, i in enumerate(picks):
            strip.paste(cell(i), ((k % 3) * CELL_W, (k // 3) * CELL_H))
        strip.save(f"{out}/public/agent/film/{name}.webp", quality=72, method=6)

        facets = {
            "crop": list(crop), "bleed": bleed,
            "size": [box[2] - box[0], box[3] - box[1]],      # the component's own footprint in a 1120x700 stage
            "zoom": round(CELL_W / (crop[2] - crop[0]), 2),
            "motion": round(float(change.mean()), 2),          # mean grey-level change per sampled frame
            "film": [round(t0 + i * step, 1) for i in picks],
            "still": round(t0 + hero * step, 1),
            "duration": round(dur, 1),
            **palette(kept[hero][crop[1]:crop[3], crop[0]:crop[2]], bg),
        }
        with open(f"{out}/agent/data/facets/{name}.json", "w") as f:
            json.dump(facets, f, separators=(",", ":"))
        return name, None
    except Exception as e:                           # one bad clip must not stop the run
        return name, f"{type(e).__name__}: {e}"


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("names", nargs="*")
    ap.add_argument("--all", action="store_true")
    ap.add_argument("--previews", default="public/previews")
    ap.add_argument("--out", default=".")
    ap.add_argument("--jobs", type=int, default=max(1, (os.cpu_count() or 4) - 2))
    a = ap.parse_args()
    names = a.names or sorted(f[:-4] for f in os.listdir(a.previews) if f.endswith(".mp4"))
    jobs = []
    for n in names:
        src, tile = f"{a.previews}/{n}.mp4", f"{a.out}/public/agent/tiles/{n}.webp"
        if not os.path.exists(src): print(f"skip {n}: no clip", file=sys.stderr); continue
        fresh = os.path.exists(tile) and os.path.getmtime(tile) >= os.path.getmtime(src)
        if a.all or a.names or not fresh: jobs.append((n, src, a.out))
    failed = 0
    with ProcessPoolExecutor(a.jobs) as pool:
        for i, (name, err) in enumerate(pool.map(one, jobs, chunksize=4), 1):
            if err: failed += 1; print(f"FAIL {name}: {err}", file=sys.stderr)
            if i % 100 == 0: print(f"{i}/{len(jobs)}", flush=True)
    print(f"done: {len(jobs) - failed} written, {failed} failed, {len(names) - len(jobs)} already fresh")


if __name__ == "__main__":
    main()
