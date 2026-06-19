// magic-ui-globe: COBE canvas globe — auto-rotates (phi += 0.005 per frame).
// Renders immediately once canvas is sized; settle ~2 s then dwell for rotation.
export default async function capture(page, { W, H, wait }) {
  // Wait for COBE to init and fade in (opacity transition 500 ms)
  try { await wait(2000); } catch (_) {}

  // Globe is already spinning — dwell to capture rotation arc.
  try { await wait(2800); } catch (_) {}

  // Show interactivity: a slow horizontal drag spins the globe extra.
  try {
    const cx = Math.round(W * 0.5);
    const cy = Math.round(H * 0.5);
    await page.mouse.move(cx - 70, cy);
    await page.mouse.down();
    const steps = 10;
    for (let i = 1; i <= steps; i++) {
      await page.mouse.move(cx - 70 + Math.round(140 * (i / steps)), cy);
      await wait(55);
    }
    await page.mouse.up();
  } catch (_) {}

  // Let spring settle and continue auto-rotating.
  try { await wait(900); } catch (_) {}
}
