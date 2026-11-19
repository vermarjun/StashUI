#!/usr/bin/env python3
"""Replace next/image with a plain <img> so components stay universal React.

    python3 scripts/codemod-next-image.py <files...>

- drops `import X from "next/image"`
- <X ...> / <X .../> -> <img ...>
- removes Next-only props: priority, quality, placeholder, blurDataURL,
  unoptimized, sizes, loader
- `fill` becomes absolute full-size positioning (what next/image does)
"""
import re, sys

DROP = {"priority", "quality", "placeholder", "blurDataURL", "unoptimized", "sizes", "loader"}


def scan_tag(s, i):
    """Return end index (exclusive) of the JSX opening tag starting at s[i]=='<'."""
    depth = 0
    q = None
    j = i + 1
    while j < len(s):
        c = s[j]
        if q:
            if c == q:
                q = None
        elif c in "\"'`" and depth == 0:
            q = c
        elif c == "{":
            depth += 1
        elif c == "}":
            depth -= 1
        elif c == ">" and depth == 0:
            return j + 1
        j += 1
    raise ValueError("unterminated tag")


def split_attrs(body):
    """Split attribute text into top-level tokens."""
    toks, cur, depth, q = [], "", 0, None
    for c in body:
        if q:
            cur += c
            if c == q and depth == 0:
                q = None
            continue
        if c in "\"'" and depth == 0:
            q = c
            cur += c
            continue
        if c == "{":
            depth += 1
        elif c == "}":
            depth -= 1
        if c.isspace() and depth == 0:
            if cur:
                toks.append(cur)
            cur = ""
        else:
            cur += c
    if cur:
        toks.append(cur)
    return toks


def convert(s):
    m = re.search(r'^import\s+(\w+)\s+from\s+["\']next/image["\'];?\s*\n', s, re.M)
    if not m:
        return s, 0
    name = m.group(1)
    s = s[: m.start()] + s[m.end():]
    n = 0
    out, i = [], 0
    pat = re.compile(r"<" + name + r"(?=[\s/>])")
    while True:
        mm = pat.search(s, i)
        if not mm:
            out.append(s[i:])
            break
        out.append(s[i: mm.start()])
        end = scan_tag(s, mm.start())
        tag = s[mm.start(): end]
        selfclose = tag.rstrip().endswith("/>")
        body = tag[len(name) + 1: -2 if selfclose else -1]
        toks = split_attrs(body)
        keep, fill = [], False
        for t in toks:
            key = t.split("=", 1)[0]
            if key in DROP:
                continue
            if key == "fill" and ("=" not in t or t in ("fill={true}",)):
                fill = True
                continue
            keep.append(t)
        if fill:
            cls = next((k for k in keep if k.startswith("className=")), None)
            add = "absolute inset-0 h-full w-full"
            if cls is None:
                keep.append(f'className="{add}"')
            elif cls.startswith('className="'):
                keep[keep.index(cls)] = f'className="{add} {cls[11:]}'
            else:
                keep[keep.index(cls)] = cls.replace("className={", "className={" + f'"{add} " + ', 1)
        out.append("<img " + " ".join(keep) + (" />" if selfclose else ">"))
        n += 1
        i = end
    s = "".join(out).replace(f"</{name}>", "</img>")
    return s, n


if __name__ == "__main__":
    for f in sys.argv[1:]:
        src = open(f).read()
        new, n = convert(src)
        if new != src:
            open(f, "w").write(new)
            print(f"{f}: {n} tag(s)")
