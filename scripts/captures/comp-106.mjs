/**
 * Capture choreography for comp-106
 * Flip Horizontal / Flip Vertical fused button group (two icon buttons, rectangular).
 * Sequence: hover flip-h → click flip-h → hover flip-v → click flip-v → rest (~3s)
 */
export default async function choreograph({ page, W, H }) {
  const cx = W / 2;
  const cy = H / 2;

  try {
    const flipHBtn = page.getByRole('button', { name: /flip horizontal/i });
    const flipVBtn = page.getByRole('button', { name: /flip vertical/i });

    await flipHBtn.waitFor({ state: 'visible', timeout: 3000 });

    // Hover Flip Horizontal
    await flipHBtn.hover();
    await page.waitForTimeout(500);

    // Click Flip Horizontal
    await flipHBtn.click();
    await page.waitForTimeout(500);

    // Hover Flip Vertical
    await flipVBtn.hover();
    await page.waitForTimeout(500);

    // Click Flip Vertical
    await flipVBtn.click();
    await page.waitForTimeout(500);

    // Rest
    await page.mouse.move(cx + 120, cy - 60);
    await page.waitForTimeout(400);
  } catch (err) {
    try {
      await page.mouse.move(cx, cy);
      await page.waitForTimeout(500);
      await page.mouse.move(cx + 120, cy - 60);
      await page.waitForTimeout(400);
    } catch (_) {}
  }
}
