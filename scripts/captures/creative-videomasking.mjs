// Choreography for creative-videomasking
// Video masked by an irregular stepped SVG path (1213:667 aspect ratio).
// The mask has notched corners and a staircase silhouette — no pointer reaction.
// Strategy: settle, long dwell across the visible mask body, slow mouse trace
// along the upper ledge of the shape, return to near-center.

export default async function capture(page, { W, H, cfg, wait }) {
  // Wait for the video element
  try {
    await page.locator('video').first().waitFor({ state: 'visible', timeout: 5000 });
  } catch (_) {}

  // Settle so autoplay video starts painting through the mask
  await wait(800);

  // Move to the wide body center of the masked shape (roughly mid-height)
  try {
    await page.mouse.move(W * 0.5, H * 0.55, { steps: 12 });
  } catch (_) {}
  await wait(1200);

  // Slow sweep along the top-ledge step of the shape (left notch → right edge)
  // Top ledge spans roughly 20%–100% of width at ~15% of height
  try {
    const steps = 44;
    const x0 = W * 0.20;
    const y0 = H * 0.15;
    const x1 = W * 0.90;
    const y1 = H * 0.15;
    await page.mouse.move(x0, y0, { steps: 8 });
    for (let i = 1; i <= steps; i++) {
      try {
        const t = i / steps;
        await page.mouse.move(x0 + (x1 - x0) * t, y0 + (y1 - y0) * t);
      } catch (_) {}
      await wait(40);
    }
  } catch (_) {}

  // Dwell at top-right so the notched corner of the mask is in frame
  await wait(700);

  // Drift down to lower body of the shape
  try {
    await page.mouse.move(W * 0.6, H * 0.75, { steps: 20 });
  } catch (_) {}
  await wait(500);

  // Return to center for loop seam
  try {
    await page.mouse.move(W * 0.5, H * 0.55, { steps: 16 });
  } catch (_) {}
  await wait(500);
}
