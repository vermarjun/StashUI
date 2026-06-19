// Capture script for button-hover-right (file: btn-hover-right)
// Effect: pill button starts as a small circle showing only an arrow; on hover it expands width to
//         reveal "Visit" text sliding in from the right, while the arrow stays fixed on the right.
// Choreography: hover → hold full 300 ms width expansion → move away → reset → hover again.

export default async function capture({ page, W, H }) {
  try {
    // Button starts as w-12 circle; target by svg arrow or role=button
    const btn = page.getByRole('button').first();
    await btn.waitFor({ state: 'visible' });

    const box = await btn.boundingBox();
    if (!box) throw new Error('button-hover-right: button bounding box not found');

    const cx = box.x + box.width / 2;
    const cy = box.y + box.height / 2;

    await page.mouse.move(W / 2, H * 0.15);
    await page.waitForTimeout(400);

    // First hover — width expands 300 ms
    await page.mouse.move(cx, cy, { steps: 14 });
    await page.waitForTimeout(1100);

    // Move away — collapse back to circle
    await page.mouse.move(W / 2, H * 0.15, { steps: 14 });
    await page.waitForTimeout(600);

    // Second hover
    await page.mouse.move(cx, cy, { steps: 14 });
    await page.waitForTimeout(1000);

    // End on hover (expanded) state
    await page.mouse.move(cx, cy, { steps: 2 });
  } catch (err) {
    console.error('button-hover-right capture error:', err);
  }
}
