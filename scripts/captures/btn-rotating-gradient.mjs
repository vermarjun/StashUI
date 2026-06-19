// Capture script for btn-rotating-gradient
// Effect: a conic-gradient border spins continuously (spin 2s linear infinite)
// creating a rotating rainbow-ish ring around the button — always animating.
// Choreography: dwell ~3 s so multiple full rotations are captured, then
// hover once to show the focus ring, then return to resting.

export default async function capture({ page, W, H }) {
  try {
    const btn = page.getByRole('button', { name: /click me/i });
    await btn.waitFor({ state: 'visible' });

    const box = await btn.boundingBox();
    if (!box) throw new Error('btn-rotating-gradient: bounding box not found');

    const cx = box.x + box.width / 2;
    const cy = box.y + box.height / 2;

    // Start away — let the auto-spin play
    await page.mouse.move(W / 2, H * 0.15);
    await page.waitForTimeout(3000);

    // Hover over button to show it is interactive
    await page.mouse.move(cx, cy, { steps: 12 });
    await page.waitForTimeout(800);

    // Move off and let spin continue for clean loop
    await page.mouse.move(W / 2, H * 0.15, { steps: 12 });
    await page.waitForTimeout(800);
  } catch (err) {
    console.error('btn-rotating-gradient capture error:', err);
  }
}
