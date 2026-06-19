// Capture script for btn-animated-gradient
// Effect: radial-gradient spotlight follows the cursor across the button face.
// Choreography: mouse sweeps slowly across the button left→right twice so the
// glowing spotlight is clearly visible, then rests near centre for loop seam.

export default async function capture({ page, W, H }) {
  try {
    const btn = page.getByRole('button', { name: /click me/i });
    await btn.waitFor({ state: 'visible' });

    const box = await btn.boundingBox();
    if (!box) throw new Error('btn-animated-gradient: bounding box not found');

    const left = box.x + 12;
    const right = box.x + box.width - 12;
    const cy = box.y + box.height / 2;

    // Start off-button to avoid initial hover state
    await page.mouse.move(W / 2, H * 0.15);
    await page.waitForTimeout(300);

    // Enter from left edge
    await page.mouse.move(left, cy, { steps: 10 });
    await page.waitForTimeout(300);

    // Sweep right — spotlight follows
    await page.mouse.move(right, cy, { steps: 30 });
    await page.waitForTimeout(400);

    // Sweep back left
    await page.mouse.move(left, cy, { steps: 30 });
    await page.waitForTimeout(400);

    // Settle at centre
    await page.mouse.move(box.x + box.width / 2, cy, { steps: 16 });
    await page.waitForTimeout(600);
  } catch (err) {
    console.error('btn-animated-gradient capture error:', err);
  }
}
