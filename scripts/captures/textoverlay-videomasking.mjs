// Choreography for textoverlay-videomasking
// Video is visible through SVG text "UI-LAYOUT" used as a mask (dark background,
// video shows only inside the lettering). Static mask — no pointer reaction.
// Strategy: settle so the text mask and video are visible, long center dwell,
// slow horizontal sweep across the text strip to reveal letter shapes, return.

export default async function capture(page, { W, H, cfg, wait }) {
  // Wait for the SVG / video to be visible
  try {
    await page.locator('video').first().waitFor({ state: 'visible', timeout: 5000 });
  } catch (_) {}

  // Settle: video needs a moment to start under the mask
  await wait(800);

  // Place mouse near the vertical center where the masked text strip sits
  try {
    await page.mouse.move(W * 0.5, H * 0.5, { steps: 10 });
  } catch (_) {}
  await wait(1200);

  // Slow left-to-right sweep at text-strip height (~50% of component height)
  // so the viewer reads "UI-LAYOUT" through the moving video
  try {
    const steps = 50;
    const x0 = W * 0.08;
    const x1 = W * 0.92;
    const y = H * 0.50;
    await page.mouse.move(x0, y, { steps: 8 });
    for (let i = 1; i <= steps; i++) {
      try {
        const t = i / steps;
        await page.mouse.move(x0 + (x1 - x0) * t, y);
      } catch (_) {}
      await wait(42);
    }
  } catch (_) {}

  // Dwell after the sweep — the full text is now visible through the video
  await wait(900);

  // Return mouse to left-center for a clean loop
  try {
    await page.mouse.move(W * 0.5, H * 0.5, { steps: 14 });
  } catch (_) {}
  await wait(500);
}
