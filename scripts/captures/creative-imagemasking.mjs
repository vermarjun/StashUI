// Choreography for creative-imagemasking (creative-image-masking)
// A single landscape image masked by an inline SVG mask (stepped/notched silhouette,
// aspect 1213:667). The mask is applied via CSS mask-image, no hover interaction.
// Strategy: settle so the image loads through the mask, then a gentle mouse drift
// that traces the interesting stepped edges of the mask shape.

export default async function capture(page, { W, H, cfg, wait }) {
  try {
    await page.locator('img').first().waitFor({ state: 'visible', timeout: 6000 });
  } catch (_) {}

  await wait(800);

  // Start at the left notch area of the mask (notch is top-left, ~x=0%,y=18–38%)
  try {
    await page.mouse.move(W * 0.12, H * 0.28, { steps: 10 });
  } catch (_) {}
  await wait(600);

  // Drift right along the upper step ledge of the mask (~y=14%)
  try {
    const steps = 36;
    for (let i = 0; i <= steps; i++) {
      try {
        const t = i / steps;
        await page.mouse.move(W * 0.12 + (W * 0.76) * t, H * 0.16);
      } catch (_) {}
      await wait(45);
    }
  } catch (_) {}

  await wait(500);

  // Drift down along the right edge to the lower body of the mask
  try {
    await page.mouse.move(W * 0.80, H * 0.70, { steps: 20 });
  } catch (_) {}
  await wait(600);

  // Drift back left across the lower band
  try {
    const steps = 28;
    for (let i = 0; i <= steps; i++) {
      try {
        const t = i / steps;
        await page.mouse.move(W * 0.80 - (W * 0.60) * t, H * 0.72);
      } catch (_) {}
      await wait(42);
    }
  } catch (_) {}

  await wait(500);

  // Return to center
  try {
    await page.mouse.move(W * 0.5, H * 0.5, { steps: 16 });
  } catch (_) {}
  await wait(700);
}
