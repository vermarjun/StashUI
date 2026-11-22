#!/usr/bin/env python3
"""Re-edit existing grid clips without re-recording them.

    python3 scripts/rec/reframe.py [names...] [--src .rec/backup-previews] [--jobs 6] [--dry]

For each clip it:
  1. finds and cuts the browser-chrome strip native recordings leave at the top
     (the last rows of the toolbar plus the page-load bar: 6-9 px at 1120x700);
  2. measures where the component actually is (union of every pixel that differs
     from the background, over ~24 frames) and reframes the camera onto it at
     8:5, so small widgets stop floating in a big black card;
  3. caps the zoom at MAX_ZOOM so nothing gets blurry, and skips the reframe
     when it would gain less than MIN_GAIN;
  4. re-encodes mp4 (h264) + jpg poster into public/previews (and removes the
     old webm: vp9 was larger than h264 here, and every browser plays mp4).

Reads from --src (the untouched originals), so it is idempotent: run it as
often as you like. Writes a JSON log of every decision to .rec/reframe.json.
"""
import json, os, subprocess, sys
from concurrent.futures import ThreadPoolExecutor
import numpy as np

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
args = sys.argv[1:]
def opt(k, d):
    return args[args.index(k) + 1] if k in args else d
SRC = os.path.join(ROOT, opt("--src", ".rec/backup-previews"))
OUT = os.path.join(ROOT, opt("--out", "public/previews"))
JOBS = int(opt("--jobs", "6"))
DRY = "--dry" in args
names = [a for i, a in enumerate(args) if not a.startswith("--") and (i == 0 or not args[i - 1].startswith("--"))]

OUT_W, OUT_H = 1120, 700
AR = OUT_W / OUT_H
MAX_ZOOM = 1.6     # never upscale more than this (source is 1120 px wide)
MIN_GAIN = 1.08    # don't bother reframing for less than 8% zoom
COVER_ZOOM = 1.2   # side-cropping cap for full-width UI (heroes, navbars):
                   # never cut more than ~8% off each side of real content


def _ambient():
    """Components whose primary type is ambient (backgrounds, effects…): their
    sides carry nothing unique, so a cover crop may cut up to MAX_ZOOM."""
    try:
        cats = json.load(open(os.path.join(ROOT, "registry", "categories.json")))
    except Exception:
        return set()
    amb = {"backgrounds", "gradients", "effects", "cursors", "3d"}
    return {n for n, c in cats.items() if ([c] if isinstance(c, str) else c or ["misc"])[0] in amb}


AMBIENT = _ambient()
SAMPLES = 24
SW, SH = 448, 280  # analysis resolution


def run(cmd, **kw):
    return subprocess.run(cmd, capture_output=True, **kw)


def probe(f):
    r = run(["ffprobe", "-v", "error", "-select_streams", "v:0", "-show_entries",
             "stream=width,height:format=duration", "-of", "json", f], text=True)
    j = json.loads(r.stdout)
    return j["streams"][0]["width"], j["streams"][0]["height"], float(j["format"]["duration"])


def strip_rows(f, W):
    """Rows of browser chrome at the top of the frame (0 if none)."""
    r = run(["ffmpeg", "-loglevel", "error", "-ss", "0.3", "-i", f, "-frames:v", "1",
             "-vf", "crop=iw:28:0:0", "-f", "rawvideo", "-pix_fmt", "gray", "-"]).stdout
    a = np.frombuffer(r, np.uint8).reshape(-1, W).astype(int)
    rows = a.mean(1)
    base = np.median(rows[14:28])
    # the strip is a band of rows, starting at row 0, that differ from the
    # page background; content never starts flush at y=0 in a native take
    k = 0
    for y in range(14):
        if abs(rows[y] - base) > 6 or (y < 3 and abs(rows[y] - rows[y + 1]) > 6):
            k = y + 1
    if k == 0:
        return 0
    return k + 1  # one extra row: the antialiased edge


def sample_frames(f, dur):
    out = []
    for i in range(SAMPLES):
        t = dur * (i + 0.5) / SAMPLES
        r = run(["ffmpeg", "-loglevel", "error", "-ss", f"{t:.3f}", "-i", f, "-frames:v", "1",
                 "-vf", f"scale={SW}:{SH}", "-f", "rawvideo", "-pix_fmt", "rgb24", "-"]).stdout
        if len(r) == SW * SH * 3:
            out.append(np.frombuffer(r, np.uint8).reshape(SH, SW, 3).astype(np.int16))
    return out


def dilate(m, r=3):
    out = m.copy()
    for dy in range(-r, r + 1):
        for dx in range(-r, r + 1):
            out |= np.roll(np.roll(m, dy, 0), dx, 1)
    return out


def drop_specks(u, min_px=260):
    """Remove small isolated blobs (the drawn cursor resting in a corner, a
    stray highlight) when bigger content exists. Blobs are found on a dilated
    mask so the letters of one word count as one blob."""
    d = dilate(u)
    h, w = d.shape
    seen = np.zeros_like(d)
    blobs = []
    for y0, x0 in zip(*np.where(d)):
        if seen[y0, x0]:
            continue
        stack = [(y0, x0)]
        seen[y0, x0] = True
        pts = []
        while stack:
            y, x = stack.pop()
            pts.append((y, x))
            for ny, nx in ((y + 1, x), (y - 1, x), (y, x + 1), (y, x - 1)):
                if 0 <= ny < h and 0 <= nx < w and d[ny, nx] and not seen[ny, nx]:
                    seen[ny, nx] = True
                    stack.append((ny, nx))
        blobs.append(pts)
    if len(blobs) < 2:
        return u
    biggest = max(len(b) for b in blobs)
    keep = np.zeros_like(u)
    for b in blobs:
        if len(b) >= min_px or len(b) == biggest:
            ys, xs = zip(*b)
            keep[list(ys), list(xs)] = True
    return u & keep


def content_box(frames, top):
    """Union bbox (in analysis px) of everything that isn't background."""
    st = np.stack(frames)[:, top:, :, :]
    c = 3
    corners = np.concatenate([
        st[:, :c, :c].reshape(-1, 3), st[:, :c, -c:].reshape(-1, 3),
        st[:, -c:, :c].reshape(-1, 3), st[:, -c:, -c:].reshape(-1, 3)])
    bg = np.median(corners, 0)
    ink = (np.abs(st - bg).max(3) > 16)
    # A pixel counts only if it is "on" in at least 3 of the samples (~1/8 of
    # the take). That keeps menus/popovers that stay open for a beat, but drops
    # the drawn cursor's path and compression specks, which would otherwise
    # drag the camera toward wherever the cursor came from.
    u = ink.sum(0) >= 3
    u = drop_specks(u)
    ys, xs = np.where(u)
    if len(xs) < 30:
        return None
    # robust extent: drop the outermost 0.3% of ink pixels on each side
    x0, x1 = np.percentile(xs, [0.3, 99.7])
    y0, y1 = np.percentile(ys, [0.3, 99.7])
    return [float(x0), float(y0 + top), float(x1 + 1), float(y1 + 1 + top)]


def plan(name):
    src = os.path.join(SRC, f"{name}.mp4")
    W, H, dur = probe(src)
    strip = strip_rows(src, W)
    # usable frame below the strip, kept at 8:5 by trimming the sides evenly
    uh = H - strip
    uw = min(W, round(uh * AR))
    ux = (W - uw) / 2
    frames = sample_frames(src, dur)
    sx, sy = W / SW, H / SH
    box = content_box(frames, int(np.ceil(strip / sy))) if frames else None
    crop = [ux, strip, uw, uh]
    zoom = 1.0
    if box:
        bx0, by0, bx1, by1 = box[0] * sx, box[1] * sy, box[2] * sx, box[3] * sy
        bw, bh = bx1 - bx0, by1 - by0
        if bw >= 0.95 * uw and 0.5 * uh <= bh <= 0.9 * uh:
            # Full-bleed content (a background, a hero, an effect) that spans
            # edge to edge but not top to bottom: the demo left dark bands
            # above/below it. Crop to its height and cut the sides instead;
            # for ambient full-width content the sides carry nothing unique.
            bx0, bx1 = ux, ux + uw
            bw = uw
            by0, by1 = by0 + 0.02 * bh, by1 - 0.02 * bh
            bh = by1 - by0
            pad = 0
            w = max(bh * AR, uw / (MAX_ZOOM if name in AMBIENT else COVER_ZOOM))
            h = w / AR
            cx, cy = (bx0 + bx1) / 2, (by0 + by1) / 2
            x = min(max(ux, cx - w / 2), ux + uw - w)
            y = min(max(strip, cy - h / 2), strip + uh - h)
            crop = [x, y, w, h]
            zoom = uw / w
            crop = [int(round(v / 2) * 2) for v in crop]
            return dict(name=name, W=W, H=H, dur=round(dur, 2), strip=strip, box=[round(v, 1) for v in box],
                        crop=crop, zoom=round(zoom, 3), mode="cover")
        pad = max(28, 0.12 * max(bw, bh))
        w, h = bw + 2 * pad, bh + 2 * pad
        if w / h < AR:
            w = h * AR
        else:
            h = w / AR
        w = max(w, uw / MAX_ZOOM)
        h = w / AR
        if uw / w >= MIN_GAIN:
            cx, cy = (bx0 + bx1) / 2, (by0 + by1) / 2
            x = min(max(ux, cx - w / 2), ux + uw - w)
            y = min(max(strip, cy - h / 2), strip + uh - h)
            crop = [x, y, w, h]
            zoom = uw / w
    crop = [int(round(v / 2) * 2) for v in crop]
    return dict(name=name, W=W, H=H, dur=round(dur, 2), strip=strip, box=box and [round(v, 1) for v in box],
                crop=crop, zoom=round(zoom, 3))


def encode(p):
    name = p["name"]
    src = os.path.join(SRC, f"{name}.mp4")
    x, y, w, h = p["crop"][0], p["crop"][1], p["crop"][2], p["crop"][3]
    vf = f"crop={w}:{h}:{x}:{y},scale={OUT_W}:{OUT_H}:flags=lanczos,setsar=1"
    mp4 = os.path.join(OUT, f"{name}.mp4")
    webm = os.path.join(OUT, f"{name}.webm")
    jpg = os.path.join(OUT, f"{name}.jpg")
    r1 = run(["ffmpeg", "-y", "-loglevel", "error", "-i", src, "-an", "-vf", vf, "-c:v", "libx264",
              "-preset", "medium", "-crf", "24", "-pix_fmt", "yuv420p", "-movflags", "+faststart", mp4])
    # no webm: vp9 came out larger than h264 for these clips and every
    # browser plays the mp4. Remove any stale one so it can't be served.
    if os.path.exists(webm):
        os.remove(webm)
    r2 = r1
    # poster: the original poster frame, reframed the same way
    srcjpg = os.path.join(SRC, f"{name}.jpg")
    r3 = run(["ffmpeg", "-y", "-loglevel", "error", "-i", srcjpg, "-vf",
              f"scale={p['W']}:{p['H']},{vf}", "-q:v", "3", jpg]) if os.path.exists(srcjpg) else None
    p["ok"] = r1.returncode == 0 and r2.returncode == 0 and (r3 is None or r3.returncode == 0)
    if not p["ok"]:
        p["err"] = (r1.stderr + r2.stderr + (r3.stderr if r3 else b"")).decode()[-400:]
    return p


def one(name):
    try:
        p = plan(name)
        if DRY:
            return p
        return encode(p)
    except Exception as e:  # keep going; report it
        return dict(name=name, ok=False, err=str(e))


if __name__ == "__main__":
    if not names:
        names = sorted(f[:-4] for f in os.listdir(SRC) if f.endswith(".mp4"))
    log_path = os.path.join(ROOT, ".rec", "reframe.json")
    log = json.load(open(log_path)) if os.path.exists(log_path) else {}
    with ThreadPoolExecutor(JOBS) as ex:
        for i, p in enumerate(ex.map(one, names)):
            log[p["name"]] = p
            if i % 50 == 0:
                print(f"{i}/{len(names)}", file=sys.stderr, flush=True)
                json.dump(log, open(log_path, "w"), indent=1)
    json.dump(log, open(log_path, "w"), indent=1)
    bad = [n for n in names if not log.get(n, {}).get("ok", DRY)]
    print(f"done {len(names)}  failed {len(bad)} {bad[:10]}")
    if not DRY:
        # refresh the hi/md/lo renditions + poster/lq webps from the new masters
        # (incremental: only clips whose master changed get re-encoded)
        import subprocess
        subprocess.run(["node", os.path.join(ROOT, "scripts", "encode-previews.mjs"), *names])
