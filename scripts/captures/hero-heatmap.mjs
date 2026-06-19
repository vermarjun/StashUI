// hero-heatmap: SINGLE-SCREEN hero with an animated Heatmap shader on the
// right (multi-colour thermal gradient over a masked icon). The shader runs
// at speed 1 — allow ~2s for GPU init and first colour cycles to appear.

export default async function capture(page, { W, H, cfg, wait }) {
  // Settle: Heatmap WebGL init + colour animation warmup
  await wait(2100);

  const cx = W / 2;
  const cy = H / 2;

  // Start at the heading area (left column)
  try {
    await page.mouse.move(cx * 0.28, cy * 0.75, { steps: 15 });
  } catch (_) {}
  await wait(380);

  // Sweep across heading text
  try {
    await page.mouse.move(cx * 0.72, cy * 0.88, { steps: 40 });
  } catch (_) {}
  await wait(350);

  // Move down to CTA
  try {
    await page.mouse.move(cx * 0.3, cy * 1.1, { steps: 22 });
  } catch (_) {}
  await wait(550);

  // Drift toward the heatmap orb on the right to show the thermal colours
  try {
    await page.mouse.move(cx * 1.5, cy * 0.9, { steps: 50 });
  } catch (_) {}
  await wait(650);

  // Return to left content
  try {
    await page.mouse.move(cx * 0.5, cy * 0.85, { steps: 32 });
  } catch (_) {}
  await wait(400);
}
