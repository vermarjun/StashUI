// Capture script for buyme-acoffee
// Effect: on hover the large SVG background scales down and fades out while the
// inner content (logo + text) becomes the focus. The component is a w-96 h-96 card.
// Choreography: hover card → dwell ~1.5 s (SVG shrinks away) → move off →
// reset → hover again → end in hover state.

export default async function capture({ page, W, H }) {
  try {
    // The component renders as an <a> wrapping a large card
    const card = page.locator('a').filter({ hasText: /buy me a coffee/i }).first();
    await card.waitFor({ state: 'visible' });

    const box = await card.boundingBox();
    if (!box) throw new Error('buyme-acoffee: bounding box not found');

    const cx = box.x + box.width / 2;
    const cy = box.y + box.height / 2;

    // Initial settle — show resting state with large SVG
    await page.mouse.move(W / 2, H * 0.05);
    await page.waitForTimeout(700);

    // Hover card — SVG scales down and fades (duration-300 delay-200 ~500 ms)
    await page.mouse.move(cx, cy, { steps: 14 });
    await page.waitForTimeout(1500);

    // Move off — SVG scales back up
    await page.mouse.move(W / 2, H * 0.05, { steps: 14 });
    await page.waitForTimeout(800);

    // Second hover
    await page.mouse.move(cx, cy, { steps: 14 });
    await page.waitForTimeout(1400);

    // End in hover state
    await page.mouse.move(cx, cy, { steps: 2 });
  } catch (err) {
    console.error('buyme-acoffee capture error:', err);
  }
}
