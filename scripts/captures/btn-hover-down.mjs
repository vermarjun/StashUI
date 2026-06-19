// Capture script for btn-hover-down
// Effect: resting state has a 3-D shadow (5 px offset); on hover the button translates down-right
//         and the shadow collapses — the opposite of button-active (hover presses it).
// Choreography: hover → hold (button sinks) → move away (button rises back) → hover again.

export default async function capture({ page, W, H }) {
  try {
    const btn = page.getByRole('button', { name: /contact me/i });
    await btn.waitFor({ state: 'visible' });

    const box = await btn.boundingBox();
    if (!box) throw new Error('btn-hover-down: button bounding box not found');

    const cx = box.x + box.width / 2;
    const cy = box.y + box.height / 2;

    await page.mouse.move(W / 2, H * 0.15);
    await page.waitForTimeout(400);

    // First hover — button sinks (translate 3,3 + shadow collapses), 100 ms transition
    await page.mouse.move(cx, cy, { steps: 12 });
    await page.waitForTimeout(1100);

    // Move away — button rises, shadow returns
    await page.mouse.move(W / 2, H * 0.15, { steps: 12 });
    await page.waitForTimeout(600);

    // Second hover
    await page.mouse.move(cx, cy, { steps: 12 });
    await page.waitForTimeout(1000);

    // End at rest (shadow visible) — move off for clean loop
    await page.mouse.move(W / 2, H * 0.15, { steps: 10 });
    await page.waitForTimeout(200);
  } catch (err) {
    console.error('btn-hover-down capture error:', err);
  }
}
