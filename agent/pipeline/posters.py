#!/usr/bin/env python3
"""Use the frame the describe pass chose (frames.best) as each component's still.

Two stills per component come from that choice:

  public/agent/tiles/<name>.webp          what an agent sees in a sheet: cut straight out of the
                                          film, so no clip is decoded. Always written.
  <previews>/<name>.jpg + poster/ + lq/   what the gallery shows before the clip plays: the full,
                                          uncropped frame at that moment of the master clip.
                                          Only with --gallery; needs ffmpeg and cwebp.

  python3 agent/pipeline/posters.py                        # tiles for every record
  python3 agent/pipeline/posters.py --gallery              # tiles + gallery posters in public/previews
  python3 agent/pipeline/posters.py --gallery --previews /path/to/public/previews --backup /path/to/keep/old
  python3 agent/pipeline/posters.py name1 name2            # just these
  --only-existing   replace a gallery poster only where one already exists
  --skip FILE       names to leave alone (for example clips being re-recorded)

A record is skipped when it names no frame, or when its film has changed since it was described.
After --gallery, run `npm run previews` so the new stills get fresh cache versions.
"""
import argparse, hashlib, json, os, shutil, subprocess, sys
from concurrent.futures import ThreadPoolExecutor
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
CELL_W, CELL_H = 480, 300
SAMPLES = 40          # frames tiles.py decodes per clip


def jload(p, default=None):
    try:
        with open(p) as f:
            return json.load(f)
    except (OSError, ValueError):
        return default


def tile(name, best):
    film = os.path.join(ROOT, "public/agent/film", f"{name}.webp")
    if not os.path.exists(film):
        return False
    im = Image.open(film).convert("RGB")
    c, r = (best - 1) % 3, (best - 1) // 3
    im.crop((c * CELL_W, r * CELL_H, (c + 1) * CELL_W, (r + 1) * CELL_H)).save(
        os.path.join(ROOT, "public/agent/tiles", f"{name}.webp"), quality=78, method=6)
    return True


def gallery(name, t, previews, backup):
    mp4 = os.path.join(previews, f"{name}.mp4")
    if not os.path.exists(mp4):
        return "no master clip"
    jpg, poster, lq = (os.path.join(previews, f"{name}.jpg"), os.path.join(previews, "poster", f"{name}.webp"),
                       os.path.join(previews, "lq", f"{name}.webp"))
    if backup:
        for src, sub in ((jpg, ""), (poster, "poster"), (lq, "lq")):
            dst = os.path.join(backup, sub, os.path.basename(src))
            if os.path.exists(src) and not os.path.exists(dst):   # the first backup is the original; never overwrite it
                os.makedirs(os.path.dirname(dst), exist_ok=True)
                shutil.copy2(src, dst)
    tmp = jpg + ".new.jpg"
    # The film's frames were sampled at SAMPLES per clip (tiles.py), and the record's time is
    # sample index x step. Seeking to that time lands a fraction of a second off, which is a
    # different picture in a fast transition, so take the same sample the film took.
    dur = float(subprocess.check_output(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", mp4]))
    idx = max(0, round(t * SAMPLES / dur))
    r = subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", mp4, "-vf", f"fps={SAMPLES / dur:.4f},select=eq(n\\,{idx})",
                        "-frames:v", "1", "-q:v", "2", tmp], capture_output=True)
    if r.returncode or not os.path.exists(tmp) or os.path.getsize(tmp) < 500:
        if os.path.exists(tmp):
            os.remove(tmp)
        return "ffmpeg could not read that frame"
    os.replace(tmp, jpg)
    os.makedirs(os.path.dirname(poster), exist_ok=True)
    os.makedirs(os.path.dirname(lq), exist_ok=True)
    for argv in (["cwebp", "-quiet", "-q", "72", "-m", "6", "-resize", "640", "0", jpg, "-o", poster],
                 ["cwebp", "-quiet", "-q", "40", "-resize", "32", "0", jpg, "-o", lq]):
        if subprocess.run(argv, capture_output=True).returncode:
            return "cwebp failed"
    return None


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("names", nargs="*")
    ap.add_argument("--gallery", action="store_true", help="also replace the gallery poster")
    ap.add_argument("--previews", default=os.path.join(ROOT, "public/previews"))
    ap.add_argument("--backup", default=None, help="folder to keep the stills that get replaced")
    ap.add_argument("--only-existing", action="store_true", help="gallery: only replace posters that already exist in --previews")
    ap.add_argument("--skip", default=None, help="gallery: a file of names to leave alone, one per line")
    ap.add_argument("--jobs", type=int, default=4)
    a = ap.parse_args()
    rec_dir = os.path.join(ROOT, "agent/data/records")
    names = a.names or sorted(f[:-5] for f in os.listdir(rec_dir) if f.endswith(".json"))
    jobs, skipped = [], {}
    for n in names:
        rec = jload(os.path.join(rec_dir, f"{n}.json"))
        if not rec:
            skipped[n] = "no record"
            continue
        fr, film = rec["frames"], os.path.join(ROOT, "public/agent/film", f"{n}.webp")
        if not isinstance(fr.get("best"), int) or fr.get("render") in ("blank", "broken"):
            skipped[n] = f"no usable frame ({fr.get('render')})"
            continue
        if rec["_meta"].get("frames_from") != "film" or not os.path.exists(film):
            skipped[n] = "no film"
            continue
        jobs.append((n, fr["best"], fr.get("best_time")))

    tiles = sum(tile(n, best) for n, best, _ in jobs)
    print(f"tiles: {tiles} written from the chosen frame, {len(skipped)} left as they were")
    if a.gallery:
        leave = {l.strip() for l in open(a.skip)} if a.skip else set()
        before = len(jobs)
        jobs = [j for j in jobs if j[0] not in leave and
                (not a.only_existing or os.path.exists(os.path.join(a.previews, "poster", f"{j[0]}.webp")))]
        if before != len(jobs):
            print(f"gallery posters: {before - len(jobs)} left alone (--skip / --only-existing)")
        failed = {}
        with ThreadPoolExecutor(a.jobs) as pool:
            for (n, _, t), err in zip(jobs, pool.map(lambda j: gallery(j[0], j[2], a.previews, a.backup) if j[2] is not None else "no frame time", jobs)):
                if err:
                    failed[n] = err
        print(f"gallery posters: {len(jobs) - len(failed)} replaced in {a.previews}" + (f", originals kept in {a.backup}" if a.backup else ""))
        for n, why in list(failed.items())[:30]:
            print(f"  not replaced {n}: {why}")
    by = {}
    for why in skipped.values():
        by[why] = by.get(why, 0) + 1
    for why, c in by.items():
        print(f"  skipped {c}: {why}")


if __name__ == "__main__":
    main()
