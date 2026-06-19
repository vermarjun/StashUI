// Capture script for btn-arrow-right
// Effect: on hover the dark circle pill on the right expands to fill the full
// button width, revealing the arrow icon inside. Width transitions smoothly.
// Choreography: hover in → dwell so pill expands fully → away → reset → hover again.

export default async function capture({ page, W, H }) {
  try {
    const btn = page.getByRole('button', { name: /contact us/i });
    await btn.waitFor({ state: 'visible' });

    const box = await btn.boundingBox();
    if (!box) throw new Error('btn-arrow-right: bounding box not found');

    const cx = box.x + box.width / 2;
    const cy = box.y + box.height / 2;

    // Start away
    await page.mouse.move(W / 2, H * 0.15);
    await page.waitForTimeout(400);

    // First hover — pill expands, dwell 1.2 s
    await page.mouse.move(cx, cy, { steps: 12 });
    await page.waitForTimeout(1200);

    // Move off — pill shrinks back
    await page.mouse.move(W / 2, H * 0.15, { steps: 12 });
    await page.waitForTimeout(600);

    // Second hover
    await page.mouse.move(cx, cy, { steps: 12 });
    await page.waitForTimeout(1100);

    // End on button (hovering)
    await page.mouse.move(cx, cy, { steps: 2 });
  } catch (err) {
    console.error('btn-arrow-right capture error:', err);
  }
}
