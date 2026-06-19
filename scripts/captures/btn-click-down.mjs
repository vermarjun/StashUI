// Capture script for btn-click-down
// Effect: resting state has a 3-D shadow offset; active/click press translates the button down-right
//         and collapses the shadow — shows depth.
// Choreography: hover → press (mouse down) → brief hold → release → hover again for second press.

export default async function capture({ page, W, H }) {
  try {
    const btn = page.getByRole('button', { name: /contact me/i });
    await btn.waitFor({ state: 'visible' });

    const box = await btn.boundingBox();
    if (!box) throw new Error('btn-click-down: button bounding box not found');

    const cx = box.x + box.width / 2;
    const cy = box.y + box.height / 2;

    await page.mouse.move(W / 2, H * 0.15);
    await page.waitForTimeout(300);

    // Move onto button
    await page.mouse.move(cx, cy, { steps: 12 });
    await page.waitForTimeout(400);

    // First click-down: press and hold briefly
    await page.mouse.down();
    await page.waitForTimeout(350);
    await page.mouse.up();
    await page.waitForTimeout(400);

    // Move away — back to rest
    await page.mouse.move(W / 2, H * 0.15, { steps: 12 });
    await page.waitForTimeout(400);

    // Second hover + click
    await page.mouse.move(cx, cy, { steps: 12 });
    await page.waitForTimeout(350);
    await page.mouse.down();
    await page.waitForTimeout(350);
    await page.mouse.up();
    await page.waitForTimeout(300);

    // End at rest position (away from button)
    await page.mouse.move(W / 2, H * 0.15, { steps: 10 });
  } catch (err) {
    console.error('btn-click-down capture error:', err);
  }
}
