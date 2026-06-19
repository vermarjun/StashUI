// Capture script for btn-hover-multiple
// Effect: on hover the button and its shadow layer both translate up-left, revealing a cascading
//         triple shadow (3 stacked offsets) behind them.
// Choreography: hover → hold so triple shadow fully appears → move away → reset → hover again.

export default async function capture({ page, W, H }) {
  try {
    const btn = page.getByRole('button', { name: /contact me/i });
    await btn.waitFor({ state: 'visible' });

    const box = await btn.boundingBox();
    if (!box) throw new Error('btn-hover-multiple: button bounding box not found');

    // Extra padding needed: shadow extends 15 px right + down, button shifts 3 px up-left
    const cx = box.x + box.width / 2;
    const cy = box.y + box.height / 2;

    await page.mouse.move(W / 2, H * 0.15);
    await page.waitForTimeout(400);

    // First hover — 300 ms transition
    await page.mouse.move(cx, cy, { steps: 14 });
    await page.waitForTimeout(1200);

    // Move away
    await page.mouse.move(W / 2, H * 0.15, { steps: 14 });
    await page.waitForTimeout(600);

    // Second hover
    await page.mouse.move(cx, cy, { steps: 14 });
    await page.waitForTimeout(1100);

    // End on hover state (shadows visible)
    await page.mouse.move(cx, cy, { steps: 2 });
  } catch (err) {
    console.error('btn-hover-multiple capture error:', err);
  }
}
