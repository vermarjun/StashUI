/**
 * Choreography: tailwind-image-accordion
 * Three CSS-only horizontal image panels that expand on hover.
 * Mouse sweeps left→right, pausing on each panel.
 */
export default async function capture(page, { W, H, wait }) {
  // 1. Mount settle
  try { await wait(700); } catch (_) {}

  const panels = page.locator('article');
  const count = await panels.count().catch(() => 3);

  if (count > 0) {
    // Try bounding-box based hover
    for (let i = 0; i < count; i++) {
      try {
        const box = await panels.nth(i).boundingBox();
        if (box) {
          await page.mouse.move(
            box.x + box.width / 2,
            box.y + box.height / 2,
            { steps: 10 }
          );
          await wait(1000);
        }
      } catch (_) {}
    }
  } else {
    // Fallback: fractional x positions
    const y = H / 2;
    for (const frac of [0.2, 0.5, 0.8]) {
      try {
        await page.mouse.move(W * frac, y, { steps: 10 });
        await wait(1000);
      } catch (_) {}
    }
  }

  // Return to center
  try {
    await page.mouse.move(W / 2, H / 2, { steps: 10 });
    await wait(400);
  } catch (_) {}
}
