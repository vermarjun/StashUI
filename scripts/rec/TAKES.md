# Writing a take script (for agents)

Every grid video is recorded by `scripts/rec/take.mjs`. If a component has no
script of its own, a default by kind runs (`scripts/rec/defaults.mjs`: buttons
get hovered and pressed, inputs get typed into, selects get opened and picked,
and so on). Your job is to write `scripts/takes/<name>.mjs` **only when the
default doesn't show what makes this component special**.

The rig already does the boring parts. You do NOT handle: page loading, zoom,
framing/cropping, speed, the loop, encoding, or the cursor drawing. You only
script what a calm human would do with the component.

## The shape

```js
// scripts/takes/<name>.mjs — what it shows, in one line
export default async (film) => {
  await film.hover({ text: "Pricing" });            // look at something
  await film.click({ role: "button", name: /monthly/i });
  await film.type("input[type=email]", "maya@stashui.dev");
};
```

The component is already mounted and has had a 1.1 s establishing hold when
your function starts. When it returns, the rig glides the cursor back to rest,
holds 0.9 s and stops. Total take ≈ 4–9 s of real time. **Aim for 5–7 s.**

## The API (film)

| call | does |
|---|---|
| `film.glide(target, {secs})` | move the cursor there on an eased curve (no click). Default speed scales with distance. |
| `film.hover(target, {hold=1200})` | glide + dwell, so hover effects play out |
| `film.click(target, {hold=900})` | glide + press + dwell. `film.click(null)` clicks where the cursor is. |
| `film.type(target, "text", {delay=38})` | click the field, type like a person. `target=null` types into the focused field. |
| `film.press("Enter")` | one key |
| `film.scroll(dy, {secs=1.4})` | eased wheel scroll under the cursor (negative = up). Never scroll to the very bottom. |
| `film.drift({secs=4, cx, cy, rx, ry})` | slow figure-8 wander, for cursor-reactive effects |
| `film.hold(ms)` | wait |
| `film.hideCursor()` / `film.showCursor()` | for purely ambient things (backgrounds that ignore the mouse) |
| `film.mark("kenburns")` | for things that are genuinely static (a dot-grid pattern, a still card that ignores the mouse): the edit adds a slow 6% camera push-in, and QA stops requiring motion. Call it once, anywhere in the take. |
| `film.mark("hero")` | the poster frame is taken here: call it at the most impressive moment |
| `film.page` | the Playwright page, for anything else (`film.page.mouse.down()`, drags…) |
| `film.W`, `film.H` | viewport size (1200×750) |

`target` can be a Playwright locator, a CSS selector string, `{x, y}`
(viewport px), `{text: "Save"}` or `{role: "button", name: /save/i}`.
Prefer text/role targets over coordinates. Every element is inside
`[data-rec-root]`; popups/portals live in `body`.

## What a good take looks like

- **Show the one thing that makes this component worth picking.** A like
  button: click it, the count ticks up. A combobox: open, type to filter,
  pick. A carousel: advance twice. A dropzone: hover the zone. A card with a
  3D tilt: glide slowly across it. A keyboard mockup: type a short word.
- **Human pacing.** Glides 0.5–0.9 s, dwell 1.2–1.8 s after anything opens,
  typing ~38 ms/key. No frantic clicking. No more than ~3 interactions.
- **End where you started** when you can (close the menu, toggle back), so
  the loop reads as continuous. Not required, the loop dissolves anyway.
- **Realistic text** (a real email, a real search query), never "test" or
  "asdf".
- **Call `film.mark("hero")`** at the best moment (menu open, value picked,
  animation peak).
- Don't wrap everything in try/catch. If a selector is wrong you WANT the
  error, so you can fix it. (The runner logs it as `choreoError`.)

## Your loop for each component

```bash
# record + edit + automatic QA, without touching the live clips.
# Runs on the spare recording Mac over ssh (not this machine) and copies the
# report, sheet and clip back here:
sh scripts/rec/remote.sh <name> --mode screencast --no-live
# result + reasons:      .rec/reports/<name>.json  (pass, fails, choreoError)
# frames to sanity-check: .rec/sheets/<name>.jpg   (12 frames across the clip)
```

A take is done when `.rec/reports/<name>.json` shows `"pass": true` and `choreoError: null`,
and the take does the thing the component is for. Read the component source
(`registry/<lib>/<name>.tsx`) and its demo (`*.demo.tsx`) to know what that is.
The old capture scripts in `scripts/captures/<name>.mjs` sometimes know which
element to use; reuse that knowledge, not their timing.

QA failures and what they mean:
- `nothing visible` → the demo renders nothing. Not your job: report it.
- `starts nearly empty` is only a warning now (entrance animations are fine).
- `nothing visible` after a mount means the demo is broken: list it.
- `almost no motion` → nothing happened: your interaction missed, or the
  component needs a different interaction.
- `frozen Xs mid-clip` → a long dead pause; shorten holds or add an action.
