// Choreography for watersplash-imagemasking (water-splash-image-masking)
// A single tall image (h-[80vh]) masked by splash.svg (mask-size: cover,
// mask-position: center). The water-splash silhouette reveals a surf/wave photo.
// No hover interaction. Strategy: settle, then drift left-to-right across the
// wide splash body, tracing the ragged upper edge of the splash shape.

export default async function capture(page, { W, H, cfg, wait }) {
  try {
    await page.locator('img').first().waitFor({ state: 'visible', timeout: 6000 });
  } catch (_) {}

  await wait(800);

  // Position at left side of splash body (roughly 20% inset)
  try {
    await page.mouse.move(W * 0.20, H * 0.55, { steps: 10 });
  } catch (_) {}
  await wait(600);

  // Sweep right across the wide mid-body of the splash, with a gentle wave on y
  try {
    const steps = 44;
    const startX = W * 0.20;
    const endX = W * 0.80;
    const centerY = H * 0.52;
    for (let i = 0; i <= steps; i++) {
      try {
        const t = i / steps;
        const x = startX + (endX - startX) * t;
        const y = centerY + Math.sin(t * Math.PI * 2) * H * 0.06;
        await page.mouse.move(x, y);
      } catch (_) {}
      await wait(42);
    }
  } catch (_) {}

  await wait(600);

  // Drift up to trace the ragged splash crown (~30% height)
  try {
    await page.mouse.move(W * 0.5, H * 0.30, { steps: 18 });
  } catch (_) {}
  await wait(600);

  // Drift along the crown
  try {
    const steps = 28;
    for (let i = 0; i <= steps; i++) {
      try {
        const t = i / steps;
        await page.mouse.move(W * (0.30 + 0.40 * t), H * (0.30 - Math.sin(t * Math.PI) * 0.08));
      } catch (_) {}
      await wait(44);
    }
  } catch (_) {}

  await wait(500);

  // Return to center
  try {
    await page.mouse.move(W * 0.5, H * 0.5, { steps: 16 });
  } catch (_) {}
  await wait(700);
}
