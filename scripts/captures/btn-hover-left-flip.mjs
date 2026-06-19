// Capture script for btn-hover-left-flip
// Effect: on hover, the label flies out to the LEFT while a solid-filled clone slides in from the RIGHT.
// Choreography: hover → hold full transition → move away → reset → hover again.

export default async function capture({ page, W, H }) {
  try {
    const btn = page.getByRole('button', { name: /hover me/i });
    await btn.waitFor({ state: 'visible' });

    const box = await btn.boundingBox();
    if (!box) throw new Error('btn-hover-left-flip: button bounding box not found');

    const cx = box.x + box.width / 2;
    const cy = box.y + box.height / 2;

    await page.mouse.move(W / 2, H * 0.15);
    await page.waitForTimeout(400);

    // First hover — default transition (no explicit duration set, ~150 ms group-hover)
    await page.mouse.move(cx, cy, { steps: 14 });
    await page.waitForTimeout(1100);

    // Move away
    await page.mouse.move(W / 2, H * 0.15, { steps: 14 });
    await page.waitForTimeout(600);

    // Second hover
    await page.mouse.move(cx, cy, { steps: 14 });
    await page.waitForTimeout(1000);

    // End on button (hover state)
    await page.mouse.move(cx, cy, { steps: 2 });
  } catch (err) {
    console.error('btn-hover-left-flip capture error:', err);
  }
}
