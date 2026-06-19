// Capture script for btn-black-shadow
// Effect: hover shifts background gradient; click applies an inset shadow
// that makes the button look physically pressed (active:shadow + translate3d).
// Choreography: hover → click (pressed) → release → hover again → click → release.

export default async function capture({ page, W, H }) {
  try {
    const btn = page.getByRole('button', { name: /click me/i });
    await btn.waitFor({ state: 'visible' });

    const box = await btn.boundingBox();
    if (!box) throw new Error('btn-black-shadow: bounding box not found');

    const cx = box.x + box.width / 2;
    const cy = box.y + box.height / 2;

    // Start away
    await page.mouse.move(W / 2, H * 0.15);
    await page.waitForTimeout(400);

    // Hover to show hover-state gradient shift
    await page.mouse.move(cx, cy, { steps: 12 });
    await page.waitForTimeout(700);

    // First click — press down (inset shadow + label shift)
    await page.mouse.down();
    await page.waitForTimeout(500);
    await page.mouse.up();
    await page.waitForTimeout(500);

    // Move off briefly then back
    await page.mouse.move(W / 2, H * 0.15, { steps: 10 });
    await page.waitForTimeout(400);

    // Second hover + click cycle
    await page.mouse.move(cx, cy, { steps: 12 });
    await page.waitForTimeout(600);
    await page.mouse.down();
    await page.waitForTimeout(400);
    await page.mouse.up();
    await page.waitForTimeout(400);

    // End in resting hover state
    await page.mouse.move(cx, cy, { steps: 2 });
  } catch (err) {
    console.error('btn-black-shadow capture error:', err);
  }
}
