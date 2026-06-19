/**
 * Capture choreography for comp-74
 * Textarea with a live character-count ("X characters left") below it.
 * Sequence: click → type a sentence (watch count drop) → pause on count → move away (~4.5s).
 */
export default async function capture({ page, W, H }) {
  try {
    const textarea = page.locator('textarea').first();
    await textarea.waitFor({ state: 'visible', timeout: 3000 });

    await page.mouse.move(W * 0.8, H * 0.1, { steps: 8 });
    await page.waitForTimeout(300);

    // Focus the textarea
    await textarea.click({ force: true });
    await page.waitForTimeout(400);

    // Type enough to visibly decrement the counter
    await textarea.type(
      'Really enjoying the character limit indicator — it makes the limit feel transparent rather than a hard wall. Nice detail!',
      { delay: 32 }
    );
    await page.waitForTimeout(700); // hold so viewer can read the counter

    // Move near the character count text to draw attention
    try {
      const counter = page.locator('[role="status"]').first();
      await counter.hover({ force: true });
      await page.waitForTimeout(500);
    } catch (_) {}

    // Rest
    await page.mouse.move(W * 0.8, H * 0.85, { steps: 12 });
    await page.waitForTimeout(300);
  } catch (err) {
    try {
      await page.mouse.move(W / 2, H / 2, { steps: 8 });
      await page.waitForTimeout(400);
    } catch (_) {}
  }
}
