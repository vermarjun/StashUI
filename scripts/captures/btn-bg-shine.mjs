// Capture script for btn-bg-shine
// Effect: continuous shimmer/shine animation on the button background — always running.
// Choreography: hover on so the border highlight activates, dwell, hover off, hover back on.

export default async function capture({ page, W, H }) {
  try {
    const btn = page.getByRole('button', { name: /click me/i });
    await btn.waitFor({ state: 'visible' });

    const box = await btn.boundingBox();
    if (!box) throw new Error('btn-bg-shine: button bounding box not found');

    const cx = box.x + box.width / 2;
    const cy = box.y + box.height / 2;

    // Start away from button
    await page.mouse.move(W / 2, H * 0.15);
    await page.waitForTimeout(300);

    // First hover — let shine + border highlight play
    await page.mouse.move(cx, cy, { steps: 12 });
    await page.waitForTimeout(1100);

    // Move away — reset border state
    await page.mouse.move(W / 2, H * 0.15, { steps: 12 });
    await page.waitForTimeout(500);

    // Second hover — repeat for clean loop
    await page.mouse.move(cx, cy, { steps: 12 });
    await page.waitForTimeout(1000);

    // End near resting (slightly off-center so loop start matches end)
    await page.mouse.move(cx + 2, cy, { steps: 4 });
  } catch (err) {
    console.error('btn-bg-shine capture error:', err);
  }
}
