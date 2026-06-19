// Swapy choreography: drag one slot-item onto another to trigger the swap
// animation, pause to let it settle, then swap back so the clip loops cleanly.
//
// The demo renders data-swapy-slot / data-swapy-item elements.  We prefer
// bounding-box lookups via attribute selectors; all interactions are wrapped in
// try/catch so a missing element degrades gracefully.

export default async function capture(page, { W, H, cfg, wait }) {
  // Let the component mount and Swapy initialise
  await wait(800);

  // ── helper: get the center of an element's bounding box ──────────────────
  async function center(locator) {
    const box = await locator.boundingBox();
    if (!box) return null;
    return { x: box.x + box.width / 2, y: box.y + box.height / 2 };
  }

  // ── helper: smooth drag from (ax,ay) → (bx,by) in `steps` micro-moves ───
  async function drag(ax, ay, bx, by, steps = 12, stepDelay = 40) {
    await page.mouse.move(ax, ay);
    await wait(60);
    await page.mouse.down();
    await wait(100);
    for (let i = 1; i <= steps; i++) {
      const t = i / steps;
      await page.mouse.move(ax + (bx - ax) * t, ay + (by - ay) * t);
      await wait(stepDelay);
    }
    await wait(150);
    await page.mouse.up();
  }

  // ── First swap: slot[0] → slot[1] ────────────────────────────────────────
  try {
    const slots = page.locator('[data-swapy-slot]');
    const count = await slots.count();
    if (count < 2) throw new Error(`only ${count} slots found`);

    const a = await center(slots.nth(0));
    const b = await center(slots.nth(1));
    if (!a || !b) throw new Error('could not resolve slot bounding boxes');

    await drag(a.x, a.y, b.x, b.y);
    await wait(700); // let Swapy's spring/dynamic animation finish
  } catch (e) {
    try { await page.mouse.up(); } catch (_) {}
    // Fall back to approximate coordinate drag across the grid centre
    try {
      const ax = W * 0.25;
      const ay = H * 0.4;
      const bx = W * 0.65;
      const by = H * 0.4;
      await drag(ax, ay, bx, by);
      await wait(700);
    } catch (_) {}
  }

  // Brief pause so the swap is clearly visible before reversing
  await wait(400);

  // ── Second swap: swap back (slot[1] → slot[0]) for a clean loop seam ─────
  try {
    const slots = page.locator('[data-swapy-slot]');
    const count = await slots.count();
    if (count < 2) throw new Error('slots gone after first swap');

    const a = await center(slots.nth(0));
    const b = await center(slots.nth(1));
    if (!a || !b) throw new Error('bounding boxes missing on return pass');

    await drag(a.x, a.y, b.x, b.y);
    await wait(700);
  } catch (e) {
    try { await page.mouse.up(); } catch (_) {}
    // Coordinate fallback mirror of the first drag
    try {
      const ax = W * 0.65;
      const ay = H * 0.4;
      const bx = W * 0.25;
      const by = H * 0.4;
      await drag(ax, ay, bx, by);
      await wait(700);
    } catch (_) {}
  }

  // Final settle before the clip loops
  await wait(400);
}
