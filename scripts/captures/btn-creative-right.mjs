// Capture script for btn-creative-right
// Effect: on hover, label slides right & fades while a filled blob expands and arrow+text slide in from right.
// Choreography: hover → hold full transition (~300 ms) → move away → reset → hover again.

export default async function capture({ page, W, H }) {
  try {
    // The component is a div with role group; target by visible text
    const btn = page.locator('div.group.relative.cursor-pointer').first();
    await btn.waitFor({ state: 'visible' });

    const box = await btn.boundingBox();
    if (!box) throw new Error('btn-creative-right: button bounding box not found');

    const cx = box.x + box.width / 2;
    const cy = box.y + box.height / 2;

    await page.mouse.move(W / 2, H * 0.15);
    await page.waitForTimeout(300);

    // Hover in — 300 ms transition, dwell longer
    await page.mouse.move(cx, cy, { steps: 12 });
    await page.waitForTimeout(1100);

    // Move away
    await page.mouse.move(W / 2, H * 0.15, { steps: 12 });
    await page.waitForTimeout(500);

    // Second hover
    await page.mouse.move(cx, cy, { steps: 12 });
    await page.waitForTimeout(1000);

    // End on hover state
    await page.mouse.move(cx, cy, { steps: 2 });
  } catch (err) {
    console.error('btn-creative-right capture error:', err);
  }
}
