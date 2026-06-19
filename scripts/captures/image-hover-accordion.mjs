/**
 * Choreography: image-hover-accordion
 * Horizontal image panels that expand on hover.
 * Mouse sweeps left→right, dwelling on each panel.
 */
export default async function capture(page, { W, H, wait }) {
  // 1. Mount settle
  try { await wait(700); } catch (_) {}

  // Panel count = 5, each ~50px collapsed; expanded = ~450px
  // Sweep across at y ≈ H/2
  const y = H / 2;

  // 2. Start from left edge, enter panel 0
  try {
    await page.mouse.move(W * 0.12, y, { steps: 8 });
    await wait(900);
  } catch (_) {}

  // 3. Slide to panel 1
  try {
    await page.mouse.move(W * 0.28, y, { steps: 10 });
    await wait(900);
  } catch (_) {}

  // 4. Slide to panel 2 (center) — dwell longer
  try {
    await page.mouse.move(W * 0.48, y, { steps: 10 });
    await wait(1200);
  } catch (_) {}

  // 5. Slide to panel 3
  try {
    await page.mouse.move(W * 0.68, y, { steps: 10 });
    await wait(900);
  } catch (_) {}

  // 6. Slide to panel 4 (rightmost)
  try {
    await page.mouse.move(W * 0.88, y, { steps: 10 });
    await wait(900);
  } catch (_) {}

  // 7. Return to center for clean loop
  try {
    await page.mouse.move(W / 2, y, { steps: 12 });
    await wait(400);
  } catch (_) {}
}
