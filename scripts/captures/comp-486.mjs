/**
 * Capture choreography for comp-486
 * Number range input — two numeric inputs ("From" / "To") joined side-by-side.
 * Sequence: click "From" → type min value → Tab to "To" → type max value →
 * move away (~4s).
 */
export default async function capture({ page, W, H }) {
  try {
    const fromInput = page.getByPlaceholder('From');
    const toInput = page.getByPlaceholder('To');
    await fromInput.waitFor({ state: 'visible', timeout: 3000 });

    await page.mouse.move(W * 0.8, H * 0.15, { steps: 8 });
    await page.waitForTimeout(300);

    // Click and fill the "From" field
    await fromInput.click({ force: true });
    await page.waitForTimeout(350);
    await fromInput.type('100', { delay: 80 });
    await page.waitForTimeout(400);

    // Tab to the "To" field
    await page.keyboard.press('Tab');
    await page.waitForTimeout(350);

    // Type the max value
    await toInput.type('500', { delay: 80 });
    await page.waitForTimeout(500);

    // Hover "From" briefly to show the joined border treatment
    await fromInput.hover({ force: true });
    await page.waitForTimeout(400);

    // Move away
    await page.mouse.move(W * 0.8, H * 0.85, { steps: 12 });
    await page.waitForTimeout(300);
  } catch (err) {
    try {
      // Fallback: use aria-label selectors
      const fromFallback = page.getByRole('spinbutton', { name: /min|from/i });
      const toFallback = page.getByRole('spinbutton', { name: /max|to/i });
      await fromFallback.click({ force: true });
      await fromFallback.type('100', { delay: 80 });
      await page.keyboard.press('Tab');
      await toFallback.type('500', { delay: 80 });
      await page.waitForTimeout(500);
      await page.mouse.move(W * 0.8, H * 0.85, { steps: 12 });
      await page.waitForTimeout(300);
    } catch (_) {
      try {
        await page.mouse.move(W / 2, H / 2, { steps: 8 });
        await page.waitForTimeout(400);
      } catch (__) {}
    }
  }
}
