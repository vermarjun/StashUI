/**
 * Choreography: classname-slider
 *
 * Component: ClassName slider — Embla carousel with `embla-carousel-class-names`
 * plugin. Each slide uses Tailwind class variants (.is-snapped / .is-in-view) to
 * fade non-focused slides to opacity-20. 4 coloured slides (red, blue, green,
 * yellow), loop:true, slides are w-4/5 so adjacent ones peek in.
 *
 * Navigation: only dot buttons at the bottom (no arrow buttons). Clicking a dot
 * scrolls to that slide and the opacity transition fires.
 *
 * Strategy: click dot 2 → dot 3 → dot 4 → dot 1 to advance through all slides
 * and show the classname-driven opacity fade.
 */
export default async function capture(page, { W, H, wait }) {
  // Allow Embla + ClassNames plugin to initialise.
  try {
    await wait(900);
  } catch (_) {}

  // Dot buttons are rendered as flex row near the bottom of the carousel.
  // Each dot: <button type="button"> containing a div w-6 h-1.
  // They have no aria-label in this component — select by size heuristic.
  async function clickDot(idx) {
    try {
      // All <button type="button"> in the carousel — the dots are the last group
      // (no prev/next buttons exist in this variant).
      const btns = page.locator('button[type="button"]');
      const count = await btns.count();
      if (count > idx) {
        const box = await btns.nth(idx).boundingBox();
        if (box) {
          const cx = Math.round(box.x + box.width / 2);
          const cy = Math.round(box.y + box.height / 2);
          await page.mouse.move(cx, cy, { steps: 5 });
          await wait(80);
          await page.mouse.click(cx, cy);
          return;
        }
      }
    } catch (_) {}
    // Fallback: dots span the bottom strip, 4 equal slots.
    const slotW = W / 4;
    const cx = Math.round(slotW * idx + slotW / 2);
    const cy = Math.round(H * 0.91);
    await page.mouse.move(cx, cy, { steps: 5 });
    await wait(80);
    try { await page.mouse.click(cx, cy); } catch (_) {}
  }

  // Advance to slide 2 (blue).
  try {
    await clickDot(1);
    await wait(750);
  } catch (_) {}

  // Advance to slide 3 (green).
  try {
    await clickDot(2);
    await wait(750);
  } catch (_) {}

  // Advance to slide 4 (yellow).
  try {
    await clickDot(3);
    await wait(750);
  } catch (_) {}

  // Return to slide 1 (red) — closes the loop.
  try {
    await clickDot(0);
    await wait(600);
  } catch (_) {}

  // Park mouse at neutral.
  try {
    await page.mouse.move(Math.round(W * 0.5), Math.round(H * 0.4), { steps: 10 });
    await wait(300);
  } catch (_) {}
}
