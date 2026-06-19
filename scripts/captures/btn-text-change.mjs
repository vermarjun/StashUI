// Capture script for btn-text-change
// Effect: on hover, the text skews up and out while a clone skews in from below — a rolling-drum effect.
// Choreography: hover → hold full 500 ms transition → move away → reset → hover again.

export default async function capture({ page, W, H }) {
  try {
    const btn = page.getByRole('button', { name: /contact me/i });
    await btn.waitFor({ state: 'visible' });

    const box = await btn.boundingBox();
    if (!box) throw new Error('btn-text-change: button bounding box not found');

    const cx = box.x + box.width / 2;
    const cy = box.y + box.height / 2;

    await page.mouse.move(W / 2, H * 0.15);
    await page.waitForTimeout(400);

    // First hover — 500 ms transition, dwell
    await page.mouse.move(cx, cy, { steps: 14 });
    await page.waitForTimeout(1200);

    // Move off
    await page.mouse.move(W / 2, H * 0.15, { steps: 14 });
    await page.waitForTimeout(600);

    // Second hover
    await page.mouse.move(cx, cy, { steps: 14 });
    await page.waitForTimeout(1100);

    // End on button
    await page.mouse.move(cx, cy, { steps: 2 });
  } catch (err) {
    console.error('btn-text-change capture error:', err);
  }
}
