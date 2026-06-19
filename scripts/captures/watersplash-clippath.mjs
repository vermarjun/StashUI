// Choreography for watersplash-clippath (clip-path-water-splash)
// Two square images in a 2-column grid, each clipped by a complex splash SVG
// clipPath (clip-splash1 and clip-splash2) with scattered droplet sub-paths.
// Hover triggers scale-110. Strategy: settle, hover each image to trigger the
// scale, drift across each to show droplet details at the splash perimeter.

export default async function capture(page, { W, H, cfg, wait }) {
  try {
    await page.locator('figure').first().waitFor({ state: 'visible', timeout: 6000 });
  } catch (_) {}

  await wait(700);

  // Move to the center of the left splash image
  try {
    await page.mouse.move(W * 0.27, H * 0.50, { steps: 12 });
  } catch (_) {}
  await wait(700);

  // Drift upward through the left splash — crown is around 10–25% height
  try {
    const steps = 28;
    for (let i = 0; i <= steps; i++) {
      try {
        const t = i / steps;
        await page.mouse.move(
          W * (0.27 + 0.04 * Math.sin(t * Math.PI * 3)),
          H * (0.50 - 0.34 * t)
        );
      } catch (_) {}
      await wait(44);
    }
  } catch (_) {}

  await wait(500);

  // Cross over to the right splash image center
  try {
    await page.mouse.move(W * 0.73, H * 0.20, { steps: 18 });
  } catch (_) {}
  await wait(600);

  // Drift downward through the right splash body
  try {
    const steps = 30;
    for (let i = 0; i <= steps; i++) {
      try {
        const t = i / steps;
        await page.mouse.move(
          W * (0.73 + 0.04 * Math.sin(t * Math.PI * 2)),
          H * (0.20 + 0.60 * t)
        );
      } catch (_) {}
      await wait(42);
    }
  } catch (_) {}

  await wait(500);

  // Hover the right image bottom area (droplet sub-paths are scattered below)
  try {
    await page.mouse.move(W * 0.73, H * 0.80, { steps: 10 });
  } catch (_) {}
  await wait(500);

  // Return to center
  try {
    await page.mouse.move(W * 0.5, H * 0.5, { steps: 16 });
  } catch (_) {}
  await wait(700);
}
