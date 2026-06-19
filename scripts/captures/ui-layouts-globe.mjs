// ui-layouts-globe: COBE canvas globe — auto-rotates (phi += 0.003 per frame).
// Slightly slower than magic-ui globe; give same settle time then dwell.
export default async function capture(page, { W, H, wait }) {
  // Allow COBE to initialize and canvas to become visible.
  try { await wait(2000); } catch (_) {}

  // Dwell — globe auto-rotates continuously.
  try { await wait(3000); } catch (_) {}

  // Gentle drag to add visual interest.
  try {
    const cx = Math.round(W * 0.5);
    const cy = Math.round(H * 0.5);
    await page.mouse.move(cx - 60, cy);
    await page.mouse.down();
    const steps = 10;
    for (let i = 1; i <= steps; i++) {
      await page.mouse.move(cx - 60 + Math.round(120 * (i / steps)), cy);
      await wait(60);
    }
    await page.mouse.up();
  } catch (_) {}

  try { await wait(800); } catch (_) {}
}
