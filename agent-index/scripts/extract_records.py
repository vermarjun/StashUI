#!/usr/bin/env python3
"""Mechanical half of the component record (agent-index/spec/SCHEMA.md).

Everything here is derived from disk — registry.json, the semantic sidecars, the
component source and its demo. Nothing is inferred by a model, so nothing here can
be wrong in a way a reader wouldn't notice.

Writes agent-index/spec/records.base.jsonl, one record per component.
"""
import json, re, sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
SPEC = ROOT / "agent-index" / "spec"
SITE = "https://stashui.vercel.app"

# --- origin -> short tag used in the dense component rows -------------------
SHORT = {
    "Aceternity UI": "ace", "Magic UI": "mag", "React Bits": "rb", "Origin UI": "ori",
    "Cult UI": "cult", "Animate UI": "anim", "Inspira UI": "insp", "UI Layouts": "uil",
    "MVPBlocks": "mvp", "21st.dev": "21st", "shadcn": "shad", "StashUI": "own",
}
def short(lib: str) -> str:
    if lib in SHORT:
        return SHORT[lib]
    return re.sub(r"[^a-z]", "", lib.lower())[:4] or "?"

# --- the recolour bill ------------------------------------------------------
# Same scan `stashui doctor` will run post-install. Counts colours that would
# survive installation and quietly contradict the design tokens.
HEX = re.compile(r"#[0-9a-fA-F]{3,8}\b")
RGB = re.compile(r"\brgba?\s*\(")
HSL = re.compile(r"\bhsla?\s*\(")
_UTIL = (r"(?:from|via|to|bg|text|border|ring|shadow|fill|stroke|decoration|outline"
         r"|accent|caret|divide|placeholder)")
PALETTE = re.compile(
    rf"\b{_UTIL}-"
    r"(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal"
    r"|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-\d{2,3}\b"
)
# `text-black dark:text-white` is just as hardcoded as `text-zinc-900`, and 357
# components use it. Missing it made 66 components report RECOLOUR-clean when a
# `clean_only` filter had promised they were.
MONO = re.compile(rf"\b{_UTIL}-(?:black|white)\b")
def count_colors(src: str) -> int:
    return (len(HEX.findall(src)) + len(RGB.findall(src)) + len(HSL.findall(src))
            + len(PALETTE.findall(src)) + len(MONO.findall(src)))

# --- exports (used to validate any Haiku-written usage snippet) -------------
EXPORT_PATTERNS = [
    re.compile(r"export\s+(?:default\s+)?(?:const|function|class)\s+([A-Z]\w*)"),
    re.compile(r"export\s*\{([^}]*)\}"),
    # `export default Foo;` and `export default memo(Foo)` / forwardRef(Foo)
    re.compile(r"export\s+default\s+(?:React\.)?(?:memo|forwardRef)?\(?\s*([A-Z]\w*)"),
]
def find_exports(src: str) -> list[str]:
    out = []
    for m in EXPORT_PATTERNS[0].finditer(src):
        out.append(m.group(1))
    for m in EXPORT_PATTERNS[2].finditer(src):
        out.append(m.group(1))
    for m in EXPORT_PATTERNS[1].finditer(src):
        for part in m.group(1).split(","):
            part = part.split(" as ")[-1].strip()
            if re.fullmatch(r"[A-Z]\w*", part):
                out.append(part)
    seen, uniq = set(), []
    for e in out:
        if e not in seen:
            seen.add(e); uniq.append(e)
    return uniq

# --- flags ------------------------------------------------------------------
def flags_for(src: str, deps: list[str], colors: int) -> list[str]:
    f = []
    low = src.lower()
    if re.search(r"\bthree\b|@react-three|webglrenderer|createshader|gl_frag", low):
        f.append("webgl")
    elif "getcontext(\"2d\")" in low or "getcontext('2d')" in low:
        f.append("canvas")
    if re.search(r"perspective|rotate3d|translatez|transform-style", low):
        f.append("3d")
    if any(d.startswith(("motion", "framer-motion")) for d in deps):
        f.append("motion")
    if len(deps) >= 3:
        f.append("heavy")
    elif not deps:
        f.append("pure")
    if colors:
        f.append(f"{colors} colors")
    return f

REG_IMPORT = re.compile(r'(["\'])@/registry/[^/"\']+/([^"\']+)\1')
def fix_imports(code: str) -> str:
    """Demos import from the library path; consumers import from components/ui."""
    return REG_IMPORT.sub(lambda m: f"{m.group(1)}@/components/ui/{m.group(2)}{m.group(1)}", code)


UI_IMPORT = re.compile(r"""["']@/components/ui/([a-z0-9-]+)["']""")


def find_registry_deps(src: str, declared: list[str]) -> list[str]:
    """Primitives the component imports but registry.json forgot to declare.

    Most vendored components import shadcn primitives (`button`, `popover`, ...)
    and assume they already exist. Left underived, `install` emits a command that
    writes code which will not compile.
    """
    return sorted(set(declared) | set(UI_IMPORT.findall(src)))


def norm_title(t: str) -> str:
    """Group key for the same component ported by several libraries."""
    return re.sub(r"[^a-z0-9]", "", t.lower())


def read(p: Path) -> str:
    try:
        return p.read_text(encoding="utf-8")
    except Exception:
        return ""

def main() -> None:
    reg = json.loads((ROOT / "registry.json").read_text())
    cats = json.loads((ROOT / "registry/categories.json").read_text())
    srcs = json.loads((ROOT / "registry/sources.json").read_text())
    titles = json.loads((ROOT / "registry/titles.json").read_text())

    SPEC.mkdir(parents=True, exist_ok=True)
    out = (SPEC / "records.base.jsonl").open("w", encoding="utf-8")
    n = missing_src = with_demo = 0

    for item in reg["items"]:
        name = item["name"]
        files = item.get("files") or []
        rel = files[0]["path"] if files else ""
        srcpath = ROOT / rel
        src = read(srcpath)
        if not src:
            missing_src += 1
        demo = read(srcpath.with_suffix("").with_suffix(".demo.tsx")) if rel else ""
        if not demo and rel:
            demo = read(Path(str(srcpath)[:-4] + ".demo.tsx"))
        if demo:
            with_demo += 1

        origin = (srcs.get(name) or {}).get("library") or "StashUI"
        deps = item.get("dependencies") or []
        colors = count_colors(src)

        rec = {
            "name": name,
            "title": titles.get(name) or item.get("title") or name,
            "category": cats.get(name, "misc"),
            "origin": origin,
            "origin_short": short(origin),
            "exports": find_exports(src),
            "npm_deps": deps,
            "registry_deps": find_registry_deps(src, item.get("registryDependencies") or []),
            "css": bool(item.get("css") or item.get("cssVars")),
            "hardcoded_colors": colors,
            "flags": flags_for(src, deps, colors),
            "usage": fix_imports(demo.strip()) or None,
            "usage_source": "demo" if demo.strip() else None,
            "file": rel,
            "install": f"npx shadcn@latest add {SITE}/r/{name}.json",
            "preview": f"{SITE}/c/{name}",
            "_src_bytes": len(src),
        }
        out.write(json.dumps(rec, ensure_ascii=False) + "\n")
        n += 1

    out.close()

    # second pass: cost-ranked alternatives for every duplicated title
    recs = [json.loads(l) for l in (SPEC / "records.base.jsonl").open()]
    groups: dict[str, list[dict]] = {}
    for r in recs:
        groups.setdefault(norm_title(r["title"]), []).append(r)
    dupes = 0
    for r in recs:
        peers = groups[norm_title(r["title"])]
        if len(peers) < 2:
            r["dupe_group"] = None
            r["alternatives"] = []
            continue
        dupes += 1
        r["dupe_group"] = norm_title(r["title"])
        # cheapest integration first: fewest npm deps, then fewest colours to fix
        r["alternatives"] = [
            {"name": p_["name"], "origin": p_["origin"],
             "npm_deps": len(p_["npm_deps"]), "hardcoded_colors": p_["hardcoded_colors"]}
            for p_ in sorted(peers, key=lambda x: (len(x["npm_deps"]), x["hardcoded_colors"]))
            if p_["name"] != r["name"]
        ]
    with (SPEC / "records.base.jsonl").open("w") as fh:
        for r in recs:
            fh.write(json.dumps(r, ensure_ascii=False) + "\n")

    print(f"wrote {n} records -> {SPEC/'records.base.jsonl'}")
    print(f"  duplicated     : {dupes} components across {sum(1 for g in groups.values() if len(g)>1)} titles")
    print(f"  missing source : {missing_src}")
    print(f"  with demo      : {with_demo}  ({100*with_demo//max(n,1)}%)")

if __name__ == "__main__":
    main()
