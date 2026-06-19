export default async function capture(page, { W, H, cfg, wait }) {
  // Wait for the entry animations (opacity+blur fade-in, staggered up to ~1s)
  await wait(1200);

  // parallax-hero-images is mouse-driven — move the cursor from one corner
  // to another so each image shifts by its depth factor.
  const cx = W / 2;
  const cy = H / 2;

  try {
    // Start from top-left quadrant
    await page.mouse.move(cx * 0.2, cy * 0.2, { steps: 30 });
  } catch (_) {}
  await wait(400);

  try {
    // Sweep to bottom-right — images at depth 0.9 travel the most
    await page.mouse.move(cx * 1.8, cy * 1.8, { steps: 60 });
  } catch (_) {}
  await wait(500);

  try {
    // Sweep back to top-right corner
    await page.mouse.move(cx * 1.8, cy * 0.2, { steps: 50 });
  } catch (_) {}
  await wait(400);

  try {
    // Return to centre so the loop restarts cleanly
    await page.mouse.move(cx, cy, { steps: 30 });
  } catch (_) {}
  await wait(400);
}
