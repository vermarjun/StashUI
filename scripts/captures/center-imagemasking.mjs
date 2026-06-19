// Choreography for center-imagemasking (center-image-masking)
// A single tall image (h-[80vh]) masked by splash-center.svg (mask-size: contain,
// mask-position: center). The centered splash/paint-stroke shape reveals the photo.
// No hover interaction. Strategy: settle so the image paints through the mask,
// then a slow circular drift near the center of the splash to show the mask edges.

export default async function capture(page, { W, H, cfg, wait }) {
  try {
    await page.locator('img').first().waitFor({ state: 'visible', timeout: 6000 });
  } catch (_) {}

  await wait(800);

  // Move to center of the masked image
  try {
    await page.mouse.move(W * 0.5, H * 0.5, { steps: 12 });
  } catch (_) {}
  await wait(800);

  // Slow clockwise elliptical drift around the splash center
  try {
    const steps = 48;
    const cx = W * 0.5;
    const cy = H * 0.5;
    const rx = W * 0.22;
    const ry = H * 0.18;
    for (let i = 0; i <= steps; i++) {
      try {
        const angle = (2 * Math.PI * i) / steps;
        await page.mouse.move(
          cx + rx * Math.cos(angle),
          cy + ry * Math.sin(angle)
        );
      } catch (_) {}
      await wait(50);
    }
  } catch (_) {}

  await wait(800);

  // Gentle drift to upper edge of the mask to show the splash outline
  try {
    await page.mouse.move(W * 0.5, H * 0.22, { steps: 16 });
  } catch (_) {}
  await wait(500);

  // Return to center
  try {
    await page.mouse.move(W * 0.5, H * 0.5, { steps: 14 });
  } catch (_) {}
  await wait(700);
}
