// Choreography for creative-mask-clippath (clip-path-creative-mask)
// A 3×3 grid of images each clipped by a distinct SVG clipPath shape, plus a wide
// banner image clipped by a stepped/notched path below the grid.
// All clip-paths are static (no pointer-driven reveal); hover causes scale-110.
// Strategy: settle, drift across the grid rows to show variety of shapes, then
// settle on the wide banner below, return to center.

export default async function capture(page, { W, H, cfg, wait }) {
  // Allow images to load
  try {
    await page.locator('figure').first().waitFor({ state: 'visible', timeout: 6000 });
  } catch (_) {}

  await wait(600);

  // Start near the top-left of the grid
  try {
    await page.mouse.move(W * 0.18, H * 0.18, { steps: 8 });
  } catch (_) {}
  await wait(400);

  // Sweep left-to-right across the top row of clipped figures
  try {
    const steps = 30;
    for (let i = 0; i <= steps; i++) {
      try {
        const t = i / steps;
        await page.mouse.move(W * 0.18 + (W * 0.64) * t, H * 0.22);
      } catch (_) {}
      await wait(40);
    }
  } catch (_) {}

  await wait(500);

  // Drift diagonally down to the middle row center
  try {
    await page.mouse.move(W * 0.5, H * 0.45, { steps: 20 });
  } catch (_) {}
  await wait(600);

  // Sweep across the middle row
  try {
    const steps = 30;
    for (let i = 0; i <= steps; i++) {
      try {
        const t = i / steps;
        await page.mouse.move(W * 0.18 + (W * 0.64) * t, H * 0.45);
      } catch (_) {}
      await wait(40);
    }
  } catch (_) {}

  await wait(400);

  // Drift down to the banner section
  try {
    await page.mouse.move(W * 0.5, H * 0.82, { steps: 18 });
  } catch (_) {}
  await wait(800);

  // Slow drift across the banner
  try {
    const steps = 28;
    for (let i = 0; i <= steps; i++) {
      try {
        const t = i / steps;
        await page.mouse.move(W * 0.2 + (W * 0.6) * t, H * 0.82);
      } catch (_) {}
      await wait(45);
    }
  } catch (_) {}

  await wait(500);

  // Return to center for loop seam
  try {
    await page.mouse.move(W * 0.5, H * 0.5, { steps: 16 });
  } catch (_) {}
  await wait(600);
}
