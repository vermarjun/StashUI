// dotted-map (magic-ui): SVG world map with pulsing city markers.
// The map is static SVG; pulse animations run on a 1.4s loop (staggered 0.7s).
// Dwell ~3s to capture the full pulse cycle across all markers.
export default async function capture(page, { W, H, wait }) {
  // Wait for SVG to render (sync, but let layout settle)
  await wait(600);

  // Capture at least two full pulse cycles (1.4s each, staggered 0.7s)
  await wait(3000);

  // Slow mouse drift across the map for visual context in the video
  try {
    await page.mouse.move(W * 0.2, H * 0.45, { steps: 25 });
    await wait(300);
    await page.mouse.move(W * 0.5, H * 0.4, { steps: 20 });
    await wait(300);
    await page.mouse.move(W * 0.8, H * 0.5, { steps: 20 });
    await wait(300);
    await page.mouse.move(W * 0.5, H * 0.5, { steps: 15 });
  } catch (_) {}

  await wait(400);
}
