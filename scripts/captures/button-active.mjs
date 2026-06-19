// Capture script for button-active (file: btn-active)
// Effect: resting state the button is offset (translate 3 px) with no shadow; on hover it snaps to
//         origin and a shadow appears — inverse of click-down. Active/click collapses it again.
// Choreography: hover (snap + shadow) → click (collapse) → release → move off → hover again.

export default async function capture({ page, W, H }) {
  try {
    const btn = page.getByRole('button', { name: /contact me/i });
    await btn.waitFor({ state: 'visible' });

    const box = await btn.boundingBox();
    if (!box) throw new Error('button-active: button bounding box not found');

    const cx = box.x + box.width / 2;
    const cy = box.y + box.height / 2;

    await page.mouse.move(W / 2, H * 0.15);
    await page.waitForTimeout(400);

    // First hover — button translates to origin + shadow appears
    await page.mouse.move(cx, cy, { steps: 12 });
    await page.waitForTimeout(900);

    // Click to show active state (collapse translation back)
    await page.mouse.down();
    await page.waitForTimeout(300);
    await page.mouse.up();
    await page.waitForTimeout(350);

    // Move off — back to resting (offset, no shadow)
    await page.mouse.move(W / 2, H * 0.15, { steps: 12 });
    await page.waitForTimeout(500);

    // Second hover
    await page.mouse.move(cx, cy, { steps: 12 });
    await page.waitForTimeout(900);

    // End on hover state (shadow visible)
    await page.mouse.move(cx, cy, { steps: 2 });
  } catch (err) {
    console.error('button-active capture error:', err);
  }
}
