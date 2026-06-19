// Capture script for btn-hover-underline
// Effect: a 2 px underline scales in from right-to-left on hover (origin-bottom-right → left),
//         then on mouse-out scales back right. Subtle but elegant.
// Choreography: hover → hold full 300 ms ease → move away (underline retracts) → hover again.

export default async function capture({ page, W, H }) {
  try {
    const btn = page.getByRole('button', { name: /contact me/i });
    await btn.waitFor({ state: 'visible' });

    const box = await btn.boundingBox();
    if (!box) throw new Error('btn-hover-underline: button bounding box not found');

    const cx = box.x + box.width / 2;
    const cy = box.y + box.height / 2;

    await page.mouse.move(W / 2, H * 0.15);
    await page.waitForTimeout(400);

    // First hover — underline draws in
    await page.mouse.move(cx, cy, { steps: 14 });
    await page.waitForTimeout(1100);

    // Move away — underline retracts
    await page.mouse.move(W / 2, H * 0.15, { steps: 14 });
    await page.waitForTimeout(600);

    // Second hover
    await page.mouse.move(cx, cy, { steps: 14 });
    await page.waitForTimeout(1000);

    // Move away for clean loop end (resting = no underline)
    await page.mouse.move(W / 2, H * 0.15, { steps: 10 });
    await page.waitForTimeout(200);
  } catch (err) {
    console.error('btn-hover-underline capture error:', err);
  }
}
