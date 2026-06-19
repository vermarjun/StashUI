// Capture script for btn-hover14
// Effect: on hover the ArrowRight icon inside slides right (translate-x-2 transition).
// Choreography: hover → dwell ~1.2 s (arrow visibly shifted) → away → reset → hover again.

export default async function capture({ page, W, H }) {
  try {
    const btn = page.getByRole('button', { name: /schedule call/i });
    await btn.waitFor({ state: 'visible' });

    const box = await btn.boundingBox();
    if (!box) throw new Error('btn-hover14: bounding box not found');

    const cx = box.x + box.width / 2;
    const cy = box.y + box.height / 2;

    // Start away
    await page.mouse.move(W / 2, H * 0.15);
    await page.waitForTimeout(400);

    // First hover — arrow shifts right
    await page.mouse.move(cx, cy, { steps: 12 });
    await page.waitForTimeout(1200);

    // Move off — arrow resets
    await page.mouse.move(W / 2, H * 0.15, { steps: 12 });
    await page.waitForTimeout(600);

    // Second hover
    await page.mouse.move(cx, cy, { steps: 12 });
    await page.waitForTimeout(1100);

    // End on button
    await page.mouse.move(cx, cy, { steps: 2 });
  } catch (err) {
    console.error('btn-hover14 capture error:', err);
  }
}
