// comp-88: Primary "Button" with a ChevronDown icon on the right (dimmed).
// Suggests a dropdown trigger. Choreography: rest → hover → click (pressed state) → release → hover again → rest.
// Total ~3s.

export default async function capture({ page, W, H }) {
  try {
    const btn = page.getByRole('button', { name: /button/i }).first();
    await btn.waitFor({ state: 'visible' });

    // Dwell away
    await page.mouse.move(W * 0.15, H * 0.15, { steps: 8 });
    await page.waitForTimeout(400);

    // Hover
    await btn.hover({ force: true });
    await page.waitForTimeout(800);

    // Click and hold briefly to show pressed state
    const box = await btn.boundingBox();
    if (box) {
      const cx = box.x + box.width / 2;
      const cy = box.y + box.height / 2;
      await page.mouse.down();
      await page.waitForTimeout(300);
      await page.mouse.up();
    } else {
      await btn.click({ force: true });
    }
    await page.waitForTimeout(500);

    // Move away
    await page.mouse.move(W * 0.15, H * 0.15, { steps: 14 });
    await page.waitForTimeout(500);

    // Second hover to end
    await btn.hover({ force: true });
    await page.waitForTimeout(600);

    // End resting near centre
    await page.mouse.move(W * 0.5, H * 0.5, { steps: 10 });
    await page.waitForTimeout(300);
  } catch (err) {
    console.error('comp-88 capture error:', err);
  }
}
