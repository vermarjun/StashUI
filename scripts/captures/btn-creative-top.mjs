// Capture script for btn-creative-top
// Effect: on hover, the text slides up and fades while a green-filled slab
// slides in from below (group-hover translate + opacity transition ~300 ms).
// Choreography: hover in → dwell → move away → reset → hover in again.

export default async function capture({ page, W, H }) {
  try {
    const btn = page.locator('div.group.relative.cursor-pointer').first();
    await btn.waitFor({ state: 'visible' });

    const box = await btn.boundingBox();
    if (!box) throw new Error('btn-creative-top: bounding box not found');

    const cx = box.x + box.width / 2;
    const cy = box.y + box.height / 2;

    // Start away from the button
    await page.mouse.move(W / 2, H * 0.15);
    await page.waitForTimeout(300);

    // First hover — let the slide-in animation finish (~300 ms) then dwell
    await page.mouse.move(cx, cy, { steps: 12 });
    await page.waitForTimeout(1200);

    // Move away — text slides back
    await page.mouse.move(W / 2, H * 0.15, { steps: 12 });
    await page.waitForTimeout(600);

    // Second hover
    await page.mouse.move(cx, cy, { steps: 12 });
    await page.waitForTimeout(1100);

    // End on button for clean loop
    await page.mouse.move(cx, cy, { steps: 2 });
  } catch (err) {
    console.error('btn-creative-top capture error:', err);
  }
}
