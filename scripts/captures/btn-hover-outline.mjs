// Capture script for btn-hover-outline
// Effect: on hover the button inverts — solid black fills become an outlined
// white-on-transparent style (or vice versa in dark mode). Transition is instant.
// Choreography: hover in → dwell ~1.2 s → move away → reset → hover again.

export default async function capture({ page, W, H }) {
  try {
    const btn = page.locator('a').filter({ hasText: /know more/i }).first();
    await btn.waitFor({ state: 'visible' });

    const box = await btn.boundingBox();
    if (!box) throw new Error('btn-hover-outline: bounding box not found');

    const cx = box.x + box.width / 2;
    const cy = box.y + box.height / 2;

    // Start away from button
    await page.mouse.move(W / 2, H * 0.15);
    await page.waitForTimeout(400);

    // First hover — invert happens immediately, dwell to show it
    await page.mouse.move(cx, cy, { steps: 12 });
    await page.waitForTimeout(1200);

    // Move off — revert to solid fill
    await page.mouse.move(W / 2, H * 0.15, { steps: 12 });
    await page.waitForTimeout(600);

    // Second hover
    await page.mouse.move(cx, cy, { steps: 12 });
    await page.waitForTimeout(1100);

    // End on button
    await page.mouse.move(cx, cy, { steps: 2 });
  } catch (err) {
    console.error('btn-hover-outline capture error:', err);
  }
}
