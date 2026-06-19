/**
 * Capture choreography for comp-69
 * Textarea with a right-aligned "Send" button beneath it.
 * Sequence: click textarea → type comment → hover right-aligned Send → move away (~4s).
 */
export default async function capture({ page, W, H }) {
  try {
    const textarea = page.locator('textarea').first();
    await textarea.waitFor({ state: 'visible', timeout: 3000 });

    await page.mouse.move(W * 0.8, H * 0.15, { steps: 8 });
    await page.waitForTimeout(300);

    // Click to focus textarea
    await textarea.click({ force: true });
    await page.waitForTimeout(400);

    // Type realistic content
    await textarea.type('Looks great! Could we also add keyboard shortcuts for submitting?', { delay: 40 });
    await page.waitForTimeout(500);

    // Hover the Send button (right-aligned)
    try {
      const sendBtn = page.getByRole('button', { name: /send/i });
      await sendBtn.hover({ force: true });
      await page.waitForTimeout(600);
    } catch (_) {}

    // Rest
    await page.mouse.move(W * 0.15, H * 0.8, { steps: 10 });
    await page.waitForTimeout(300);
  } catch (err) {
    try {
      await page.mouse.move(W / 2, H / 2, { steps: 8 });
      await page.waitForTimeout(400);
    } catch (_) {}
  }
}
