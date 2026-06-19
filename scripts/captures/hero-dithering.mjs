// hero-dithering: SINGLE-SCREEN hero with a WebGL dither shader on the right
// (swirl shape, 4x4 ordered dither). The shader needs ~2s to fully initialise
// and start animating. Strategy: dwell for settle, then gentle mouse drift
// across the heading / CTA area and towards the shader panel.

export default async function capture(page, { W, H, cfg, wait }) {
  // Settle: WebGL context init + first paint
  await wait(2200);

  const cx = W / 2;
  const cy = H / 2;

  // Move to the left content column (heading area)
  try {
    await page.mouse.move(cx * 0.3, cy * 0.8, { steps: 20 });
  } catch (_) {}
  await wait(400);

  // Drift across heading towards centre
  try {
    await page.mouse.move(cx * 0.7, cy * 0.9, { steps: 35 });
  } catch (_) {}
  await wait(350);

  // Hover over the CTA button area
  try {
    await page.mouse.move(cx * 0.35, cy * 1.1, { steps: 25 });
  } catch (_) {}
  await wait(500);

  // Drift toward the shader orb on the right
  try {
    await page.mouse.move(cx * 1.5, cy, { steps: 45 });
  } catch (_) {}
  await wait(500);

  // Return to left content so frame is representative
  try {
    await page.mouse.move(cx * 0.5, cy * 0.9, { steps: 30 });
  } catch (_) {}
  await wait(400);
}
