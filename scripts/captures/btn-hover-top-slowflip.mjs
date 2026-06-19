// Capture script for btn-hover-top-slowflip
// Effect: on hover the visible label slides up and out while a filled slab slides in from below.
// Choreography: hover in → hold for full flip → move away → reset → hover in again.

export default async function capture({ page, W, H }) {
  try {
    const btn = page.getByRole('button', { name: /hover me/i });
    await btn.waitFor({ state: 'visible' });

    const box = await btn.boundingBox();
    if (!box) throw new Error('btn-hover-top-slowflip: button bounding box not found');

    const cx = box.x + box.width / 2;
    const cy = box.y + box.height / 2;

    // Rest position
    await page.mouse.move(W / 2, H * 0.15);
    await page.waitForTimeout(400);

    // First hover — slide duration is 500 ms, dwell so full animation completes
    await page.mouse.move(cx, cy, { steps: 14 });
    await page.waitForTimeout(1200);

    // Move off — let it reset
    await page.mouse.move(W / 2, H * 0.15, { steps: 14 });
    await page.waitForTimeout(700);

    // Second hover — repeat
    await page.mouse.move(cx, cy, { steps: 14 });
    await page.waitForTimeout(1100);

    // End on the button (hover state) for a clean loop frame
    await page.mouse.move(cx, cy, { steps: 2 });
  } catch (err) {
    console.error('btn-hover-top-slowflip capture error:', err);
  }
}
