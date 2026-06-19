// Choreography for animal-imagemasking (animal-image-masking)
// Two square images side by side in a 2-column grid: left masked by cat.svg,
// right masked by panda.svg. Both use CSS mask-image with contain+center.
// No hover interaction. Strategy: settle so images load inside the SVG silhouettes,
// then a slow drift across each masked image to appreciate the animal shapes.

export default async function capture(page, { W, H, cfg, wait }) {
  try {
    await page.locator('img').first().waitFor({ state: 'visible', timeout: 6000 });
  } catch (_) {}

  await wait(800);

  // Move to center of the left (cat) masked image
  try {
    await page.mouse.move(W * 0.27, H * 0.50, { steps: 12 });
  } catch (_) {}
  await wait(800);

  // Slow drift upward across the cat silhouette (head region)
  try {
    const steps = 24;
    for (let i = 0; i <= steps; i++) {
      try {
        const t = i / steps;
        await page.mouse.move(W * 0.27, H * (0.50 - 0.28 * t));
      } catch (_) {}
      await wait(45);
    }
  } catch (_) {}

  await wait(500);

  // Drift across to the right (panda) masked image
  try {
    await page.mouse.move(W * 0.73, H * 0.28, { steps: 20 });
  } catch (_) {}
  await wait(600);

  // Slow drift downward across the panda silhouette
  try {
    const steps = 24;
    for (let i = 0; i <= steps; i++) {
      try {
        const t = i / steps;
        await page.mouse.move(W * 0.73, H * (0.28 + 0.44 * t));
      } catch (_) {}
      await wait(45);
    }
  } catch (_) {}

  await wait(700);

  // Return to center
  try {
    await page.mouse.move(W * 0.5, H * 0.5, { steps: 14 });
  } catch (_) {}
  await wait(600);
}
