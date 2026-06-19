// Capture script for btn-cross-arrow
// Effect: on hover the arrow icon grid translates up-right so a second copy
// slides in from bottom-left — a cross-arrow diagonal slide effect (~200 ms).
// Choreography: hover in → dwell to show diagonal arrow swap → away → reset → hover again.

export default async function capture({ page, W, H }) {
  try {
    const btn = page.getByRole('button', { name: /contact me/i });
    await btn.waitFor({ state: 'visible' });

    const box = await btn.boundingBox();
    if (!box) throw new Error('btn-cross-arrow: bounding box not found');

    const cx = box.x + box.width / 2;
    const cy = box.y + box.height / 2;

    // Start away
    await page.mouse.move(W / 2, H * 0.15);
    await page.waitForTimeout(400);

    // First hover — arrow crosses, dwell 1.2 s
    await page.mouse.move(cx, cy, { steps: 12 });
    await page.waitForTimeout(1200);

    // Move off — arrows reset
    await page.mouse.move(W / 2, H * 0.15, { steps: 12 });
    await page.waitForTimeout(600);

    // Second hover
    await page.mouse.move(cx, cy, { steps: 12 });
    await page.waitForTimeout(1100);

    // End on button
    await page.mouse.move(cx, cy, { steps: 2 });
  } catch (err) {
    console.error('btn-cross-arrow capture error:', err);
  }
}
