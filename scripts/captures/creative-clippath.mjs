// Choreography for creative-clippath (clip-path-creative)
// A 3-column section: left = image clipped by an organic squiggle shape,
// center = looping video clipped by a multi-blob silhouette, right = image
// clipped by another organic contour. Hover triggers scale-105.
// Strategy: settle (video starts), hover each figure in turn to show scale,
// slow drift center-to-right, dwell, return.

export default async function capture(page, { W, H, cfg, wait }) {
  // Wait for at least one figure to appear
  try {
    await page.locator('figure').first().waitFor({ state: 'visible', timeout: 6000 });
  } catch (_) {}

  await wait(700);

  // Hover the left image (squiggle clip)
  try {
    await page.mouse.move(W * 0.18, H * 0.45, { steps: 10 });
  } catch (_) {}
  await wait(600);

  // Drift to the center video (multi-blob clip)
  try {
    await page.mouse.move(W * 0.5, H * 0.45, { steps: 18 });
  } catch (_) {}
  await wait(800);

  // Slow upward drift within the center column to trace the blob contour
  try {
    const steps = 24;
    for (let i = 0; i <= steps; i++) {
      try {
        const t = i / steps;
        await page.mouse.move(W * 0.5, H * 0.45 - H * 0.25 * t);
      } catch (_) {}
      await wait(40);
    }
  } catch (_) {}

  await wait(500);

  // Drift to the right image
  try {
    await page.mouse.move(W * 0.82, H * 0.45, { steps: 16 });
  } catch (_) {}
  await wait(800);

  // Gentle drift down and back to center for loop seam
  try {
    await page.mouse.move(W * 0.5, H * 0.55, { steps: 18 });
  } catch (_) {}
  await wait(700);
}
