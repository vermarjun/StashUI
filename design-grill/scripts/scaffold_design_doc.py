#!/usr/bin/env python3
"""Write the three design-doc artifacts, then keep them in sync.

The design doc has to exist in two shapes at once: prose a person will argue
with, and data a build agent can check itself against. Maintaining both by hand
means they drift, and a design doc that no longer describes the product is worse
than no design doc. So `design.tokens.json` is the source of truth and the other
two are derived from it.

    scaffold_design_doc.py --project Ledger        # blank scaffold, all three files
    scaffold_design_doc.py --sync                  # tokens.json -> DESIGN.md + .css
    scaffold_design_doc.py --check                 # exit 1 if a field is unfilled

Stdlib only.
"""
from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path

TODO = "TODO"

SCAFFOLD = {
    "product": {
        "name": TODO, "one_liner": TODO, "audience": TODO,
        "primary_action": TODO, "platform": "web", "environment": TODO,
    },
    "direction": {
        "mood": [TODO, TODO, TODO],
        "references_right": [TODO, TODO],
        "reference_wrong": TODO,
        "avoid": [],
    },
    "color": {
        "mode": "both", "default": "light",
        "accent": {"hue": TODO, "chroma": TODO, "light": TODO, "dark": TODO, "why": TODO},
        "accent_secondary": None,
        "neutral_tint": {"kind": TODO, "hue": TODO, "chroma": TODO},
        "surfaces": {"background": TODO, "card": TODO, "popover": TODO, "muted": TODO},
        "surfaces_dark": {"background": TODO, "card": TODO, "popover": TODO, "muted": TODO},
        "foreground": {"body": TODO, "muted": TODO, "contrast_body": TODO},
        "foreground_dark": {"body": TODO, "muted": TODO, "contrast_body": TODO},
        "border": {"light": TODO, "dark": TODO},
        "semantic": {"success": TODO, "warning": TODO, "danger": TODO, "info": TODO},
    },
    "type": {
        "display": TODO, "body": TODO, "mono": TODO,
        "scale": {"ratio": 1.25, "px": [12, 14, 16, 20, 25, 31, 39]},
        "measure": "65ch", "leading": {"body": 1.6, "heading": 1.15}, "why": TODO,
    },
    "space": {
        "base_unit": 4, "density": TODO, "control_height": TODO, "radius": TODO,
        "elevation": [TODO, TODO], "container": {"max": "1200px", "gutter": "24px"},
    },
    "motion": {
        "character": TODO,
        "duration": {"fast": 150, "slow": 300},
        "easing": {"enter": "cubic-bezier(.16,1,.3,1)", "exit": "cubic-bezier(.4,0,1,1)"},
        "reduced_motion": TODO,
    },
    "slots": [
        {"slot": "page background", "needs": TODO, "constraint": None, "component": None},
        {"slot": "primary CTA", "needs": TODO, "constraint": None, "component": None},
    ],
    "rejected": [],
}


def unfilled(obj, path="") -> list[str]:
    """Every leaf still saying TODO, as dotted paths — so --check can name them."""
    out = []
    if isinstance(obj, dict):
        for k, v in obj.items():
            out += unfilled(v, f"{path}.{k}" if path else k)
    elif isinstance(obj, list):
        for i, v in enumerate(obj):
            out += unfilled(v, f"{path}[{i}]")
    elif obj == TODO:
        out.append(path)
    return out


def css(t: dict) -> str:
    """OKLCH blocks for globals.css, in the shadcn variable names.

    Emitted with the shadcn names specifically so an installed component picks
    the palette up without being touched — the recolour pass then only has to
    deal with hardcoded values the component's author baked in.
    """
    c, sp = t["color"], t["space"]
    def block(surf, fg, border, indent="  "):
        rows = [
            ("--background", surf["background"]), ("--foreground", fg["body"]),
            ("--card", surf["card"]), ("--card-foreground", fg["body"]),
            ("--popover", surf["popover"]), ("--popover-foreground", fg["body"]),
            ("--muted", surf["muted"]), ("--muted-foreground", fg["muted"]),
            ("--border", border), ("--input", border),
        ]
        return "\n".join(f"{indent}{k}: {v};" for k, v in rows)

    accent_l, accent_d = c["accent"]["light"], c["accent"]["dark"]
    sem = c["semantic"]
    return f"""/* Generated from design.tokens.json — edit the JSON, re-run --sync.
   Paste into src/app/globals.css. Every component recolours to these. */

:root {{
{block(c["surfaces"], c["foreground"], c["border"]["light"])}
  --primary: {accent_l};
  --primary-foreground: {c["surfaces"]["background"]};
  --ring: {accent_l};
  --radius: {sp["radius"]}px;

  --success: {sem["success"]};
  --warning: {sem["warning"]};
  --destructive: {sem["danger"]};
  --info: {sem["info"]};
}}

.dark {{
{block(c["surfaces_dark"], c["foreground_dark"], c["border"]["dark"])}
  --primary: {accent_d};
  --primary-foreground: {c["surfaces_dark"]["background"]};
  --ring: {accent_d};
}}

@media (prefers-reduced-motion: reduce) {{
  /* {t["motion"]["reduced_motion"]} */
  *, *::before, *::after {{ animation-duration: .01ms !important; transition-duration: .01ms !important; }}
}}
"""


def md(t: dict) -> str:
    p, d, c, ty, sp, mo = (t["product"], t["direction"], t["color"],
                           t["type"], t["space"], t["motion"])
    slots = "\n".join(
        f"| {s['slot']} | {s['needs']} | {s.get('constraint') or '—'} | "
        f"{s.get('component') or '_unfilled_'} |" for s in t["slots"]) or "| — | — | — | — |"
    rejected = "\n".join(f"- {r}" for r in t["rejected"]) or "- _nothing rejected yet — this section is the point of the doc, fill it_"
    return f"""# {p['name']} — design doc

Generated from `design.tokens.json`. Change the JSON and re-run
`scaffold_design_doc.py --sync`; do not edit the two derived files by hand.

## 1. Product

{p['one_liner']}

- **Audience** — {p['audience']}
- **Primary action** — {p['primary_action']}
- **Platform** — {p['platform']}
- **Environment** — {p['environment']}

## 2. Direction

**Mood:** {', '.join(d['mood'])}

Right: {'; '.join(d['references_right'])}
Close but wrong: {d['reference_wrong']}

Avoid: {', '.join(d['avoid']) or '—'}

## 3. Colour

Mode: {c['mode']} (default {c['default']}). All values OKLCH.

**Accent** `{c['accent']['light']}` / dark `{c['accent']['dark']}` — hue {c['accent']['hue']}, chroma {c['accent']['chroma']}.
{c['accent']['why']}

Secondary accent: {c['accent_secondary'] or 'none — one accent, deliberately'}
Neutrals: {c['neutral_tint']['kind']} (hue {c['neutral_tint']['hue']}, chroma {c['neutral_tint']['chroma']})

| Token | Light | Dark |
| --- | --- | --- |
| background | `{c['surfaces']['background']}` | `{c['surfaces_dark']['background']}` |
| card | `{c['surfaces']['card']}` | `{c['surfaces_dark']['card']}` |
| muted | `{c['surfaces']['muted']}` | `{c['surfaces_dark']['muted']}` |
| foreground | `{c['foreground']['body']}` | `{c['foreground_dark']['body']}` |
| border | `{c['border']['light']}` | `{c['border']['dark']}` |

Body contrast: {c['foreground']['contrast_body']} light / {c['foreground_dark']['contrast_body']} dark.

Semantic (**not** accents): success `{c['semantic']['success']}`, warning `{c['semantic']['warning']}`, danger `{c['semantic']['danger']}`, info `{c['semantic']['info']}`.

## 4. Type

- **Display** — {ty['display']}
- **Body** — {ty['body']}
- **Mono** — {ty['mono']}
- **Scale** — ratio {ty['scale']['ratio']}: {', '.join(f"{n}px" for n in ty['scale']['px'])}
- **Measure** — {ty['measure']} · **Leading** — {ty['leading']['body']} body / {ty['leading']['heading']} heading

{ty['why']}

## 5. Space, shape, elevation

Base unit {sp['base_unit']}px · density {sp['density']} · control height {sp['control_height']}px · radius {sp['radius']}px (one value, derived steps only).
Container {sp['container']['max']} with a {sp['container']['gutter']} gutter.
Elevation: {', '.join(str(e) for e in sp['elevation'])}

## 6. Motion

Character **{mo['character']}** — {mo['duration']['fast']}ms fast, {mo['duration']['slow']}ms slow.
Enter `{mo['easing']['enter']}`, exit `{mo['easing']['exit']}`.
Reduced motion: {mo['reduced_motion']}

## 7. Slots

Navigate the StashUI MCP server against this table, one row at a time:
`stashui_categories()` -> `stashui_category(slug, ...)` -> `stashui_component(name)`

| Slot | Needs | Constraint | Component chosen |
| --- | --- | --- | --- |
{slots}

## 8. Rejected

{rejected}
"""


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--project", default="Untitled")
    ap.add_argument("--dir", default=".")
    ap.add_argument("--sync", action="store_true", help="regenerate md+css from the json")
    ap.add_argument("--check", action="store_true", help="exit 1 if any field is unfilled")
    a = ap.parse_args()

    root = Path(a.dir).resolve()
    tokens = root / "design.tokens.json"

    if a.sync or a.check:
        if not tokens.exists():
            sys.exit(f"no {tokens} — scaffold it first")
        t = json.loads(tokens.read_text())
        missing = unfilled(t)
        if a.check:
            if missing:
                print(f"{len(missing)} unfilled field(s):")
                for m in missing:
                    print(f"  {m}")
                sys.exit(1)
            print("design doc complete — every field filled")
            return
        if missing:
            print(f"warning: {len(missing)} field(s) still TODO ({', '.join(missing[:4])}…)",
                  file=sys.stderr)
        (root / "DESIGN.md").write_text(md(t))
        (root / "design.tokens.css").write_text(css(t))
        print("synced DESIGN.md + design.tokens.css from design.tokens.json")
        return

    if tokens.exists():
        sys.exit(f"{tokens} already exists — use --sync, or delete it first")
    t = json.loads(json.dumps(SCAFFOLD))
    t["product"]["name"] = a.project
    tokens.write_text(json.dumps(t, indent=2))
    print(f"wrote {tokens}")
    print("fill it in from the grilling, then: scaffold_design_doc.py --sync")


if __name__ == "__main__":
    main()
