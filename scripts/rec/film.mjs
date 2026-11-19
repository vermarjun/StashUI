// The "camera operator" API every take script gets. It moves the drawn cursor
// with real mouse events along eased, slightly curved paths (same motion model
// as the SIH product-screen-recording skill's input.swift), holds so viewers can
// read, types like a person and scrolls smoothly.
//
// A take script is:   export default async (film) => { ... }
//
//   film.page                    Playwright page (escape hatch)
//   film.W, film.H               viewport size in CSS px
//   film.root()                  locator for the component's root
//   await film.glide(target, {secs})      move cursor (no click)
//   await film.hover(target, {hold})      glide + dwell (default 1200ms)
//   await film.click(target, {hold})      glide + press + dwell (default 900ms)
//   await film.type(target|null, "text")  click field (if given) + type at ~38ms/key
//   await film.press("Enter")             a key press
//   await film.scroll(dy, {secs})         eased wheel scroll; negative = up
//   await film.drift({secs})              slow wandering path (cursor-reactive effects)
//   await film.hold(ms)
//   await film.park()                     glide to a calm resting spot near the component
//   film.hideCursor() / film.showCursor()
//   film.mark("label")                    note a moment (poster = "hero" mark if set)
//
// `target` = Playwright locator | CSS selector string | {x, y} in CSS px |
//            {text: "Sign in"} | {role: "button", name: /save/i}.

const FRAME = 1000 / 60;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

function seeded(str) {
  let h = 2166136261;
  for (const c of str) h = Math.imul(h ^ c.charCodeAt(0), 16777619);
  return () => {
    h = Math.imul(h ^ (h >>> 15), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    return ((h ^= h >>> 16) >>> 0) / 4294967296;
  };
}

export function createFilm(page, { W, H, name, onMark, bbox }) {
  const rand = seeded(name);
  const marks = [];
  let t0 = Date.now();
  // start just outside the component's lower-right, like a hand resting nearby
  const rest = () => ({
    x: Math.min(W - 40, (bbox?.x ?? W * 0.3) + (bbox?.width ?? W * 0.4) + 60),
    y: Math.min(H - 40, (bbox?.y ?? H * 0.3) + (bbox?.height ?? H * 0.4) + 40),
  });
  let pos = rest();

  async function resolve(target) {
    if (target == null) return null;
    if (typeof target.x === "number" && typeof target.y === "number" && !target.boundingBox) return target;
    let loc = target;
    if (typeof target === "string") loc = page.locator(target).first();
    else if (target.text) loc = page.getByText(target.text, { exact: !!target.exact }).first();
    else if (target.role) loc = page.getByRole(target.role, { name: target.name }).first();
    await loc.waitFor({ state: "visible", timeout: 4000 });
    const b = await loc.boundingBox();
    if (!b) throw new Error("target has no box");
    // aim near the middle, not dead-centre (hands aren't precise)
    return {
      x: b.x + b.width * (0.42 + rand() * 0.16),
      y: b.y + b.height * (0.4 + rand() * 0.2),
    };
  }

  // The cursor starts hidden and fades in on its first movement: ambient takes
  // never show it, interactive ones show a hand arriving.
  let shown = false;
  async function ensureShown() {
    if (shown) return;
    shown = true;
    await page.evaluate(() => window.__recCursorHide?.(false)).catch(() => {});
  }

  async function glideTo(p, secs) {
    await ensureShown();
    const start = { ...pos };
    const dx = p.x - start.x;
    const dy = p.y - start.y;
    const len = Math.max(1, Math.hypot(dx, dy));
    const bend = Math.min(40, len * 0.08) * (rand() < 0.5 ? 1 : -1);
    const dur = Math.max(120, secs * 1000);
    const began = Date.now();
    for (;;) {
      const k = Math.min(1, (Date.now() - began) / dur);
      const t = ease(k);
      const arc = Math.sin(t * Math.PI) * bend;
      const x = start.x + dx * t - (dy / len) * arc;
      const y = start.y + dy * t + (dx / len) * arc;
      await page.mouse.move(x, y);
      pos = { x, y };
      if (k >= 1) break;
      await sleep(FRAME);
    }
  }

  // glide duration scales with distance: 0.5s short hops, 0.9s across the frame
  const autoSecs = (p) => 0.45 + Math.min(0.45, Math.hypot(p.x - pos.x, p.y - pos.y) / 1600);

  const film = {
    page,
    W,
    H,
    sleep,
    rand,
    root: () => page.locator("[data-rec-root] > *").first(),
    mark(label) {
      const t = (Date.now() - t0) / 1000;
      marks.push({ t, label });
      onMark?.(t, label);
    },
    _marks: marks,
    _resetClock() {
      t0 = Date.now();
    },
    async glide(target, { secs } = {}) {
      const p = await resolve(target);
      await glideTo(p, secs ?? autoSecs(p));
    },
    async hover(target, { hold = 1200, secs } = {}) {
      await film.glide(target, { secs });
      await sleep(hold);
    },
    async click(target, { hold = 900, secs } = {}) {
      if (target != null) await film.glide(target, { secs });
      await sleep(90);
      await page.mouse.down();
      await sleep(70);
      await page.mouse.up();
      await sleep(hold);
    },
    async type(target, text, { delay = 38, hold = 700 } = {}) {
      if (target != null) await film.click(target, { hold: 350 });
      for (const ch of text) {
        await page.keyboard.type(ch);
        // human rhythm: a little jitter, a longer pause after spaces/punctuation
        await sleep(delay * (0.6 + rand() * 0.8) + (/[ ,.@]/.test(ch) ? 60 : 0));
      }
      await sleep(hold);
    },
    async press(key, { hold = 700 } = {}) {
      await page.keyboard.press(key);
      await sleep(hold);
    },
    async scroll(dy, { secs = 1.4, hold = 900 } = {}) {
      const frames = Math.max(1, Math.round((secs * 1000) / FRAME));
      let done = 0;
      for (let i = 1; i <= frames; i++) {
        const target = dy * ease(i / frames);
        const step = Math.round(target - done);
        done += step;
        if (step) await page.mouse.wheel(0, step);
        await sleep(FRAME);
      }
      await sleep(hold);
    },
    async drift({ secs = 4, cx, cy, rx, ry } = {}) {
      // slow lissajous loop around the centre: looks like someone idly moving
      // the mouse to play with a cursor-reactive effect, and ends where it began
      cx ??= W / 2;
      cy ??= H / 2;
      rx ??= W * 0.28;
      ry ??= H * 0.22;
      const startP = { x: cx + rx * Math.sin(0), y: cy + ry * Math.sin(0) };
      await glideTo(startP, 0.6);
      const began = Date.now();
      const dur = secs * 1000;
      for (;;) {
        const k = Math.min(1, (Date.now() - began) / dur);
        const a = k * Math.PI * 2;
        const x = cx + rx * Math.sin(a);
        const y = cy + ry * Math.sin(2 * a) * 0.9;
        await page.mouse.move(x, y);
        pos = { x, y };
        if (k >= 1) break;
        await sleep(FRAME);
      }
    },
    hold: (ms) => sleep(ms),
    async park({ secs = 0.7 } = {}) {
      await glideTo(rest(), secs);
    },
    hideCursor: () => {
      shown = true; // stays hidden until showCursor()
      return page.evaluate(() => window.__recCursorHide?.(true));
    },
    showCursor: () => {
      shown = true;
      return page.evaluate(() => window.__recCursorHide?.(false));
    },
    get pos() {
      return { ...pos };
    },
    async _placeAtRest() {
      pos = rest();
      await page.evaluate(() => window.__recCursorHide?.(true)).catch(() => {});
      await page.mouse.move(pos.x, pos.y);
    },
  };
  return film;
}
