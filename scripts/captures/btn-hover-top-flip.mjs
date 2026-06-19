// Capture script for btn-hover-top-flip
// Effect: on hover the original label slides up and out (translateY -150%) while a
// filled indigo slab slides in from below (translateY 0). Transition ~300 ms.
// Choreography: hover in → dwell for full flip → move away → reset → hover again.

export default async function capture({ page, W, H }) {
  try {
    const btn = page.getByRole('button', { name: /contact me/i });
    await btn.waitFor({ state: 'visible' });

    const box = await btn.boundingBox();
    if (!box) throw new Error('btn-hover-top-flip: bounding box not found');

    const cx = box.x + box.width / 2;
    const cy = box.y + box.height / 2;

    // Rest away from button
    await page.mouse.move(W / 2, H * 0.15);
    await page.waitForTimeout(400);

    // First hover — transition ~300 ms, dwell to show filled slab
    await page.mouse.move(cx, cy, { steps: 14 });
    await page.waitForTimeout(1200);

    // Move off — slab slides back down
    await page.mouse.move(W / 2, H * 0.15, { steps: 14 });
    await page.waitForTimeout(600);

    // Second hover
    await page.mouse.move(cx, cy, { steps: 14 });
    await page.waitForTimeout(1100);

    // End on button for clean loop seam
    await page.mouse.move(cx, cy, { steps: 2 });
  } catch (err) {
    console.error('btn-hover-top-flip capture error:', err);
  }
}
