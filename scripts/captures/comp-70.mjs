/**
 * Capture choreography for comp-70
 * Textarea with a full-width "Send" button beneath it.
 * Sequence: click textarea → type comment → hover full-width Send button → move away (~4s).
 */
export default async function capture({ page, W, H }) {
  try {
    const textarea = page.locator('textarea').first();
    await textarea.waitFor({ state: 'visible', timeout: 3000 });

    await page.mouse.move(W * 0.8, H * 0.15, { steps: 8 });
    await page.waitForTimeout(300);

    // Focus textarea
    await textarea.click({ force: true });
    await page.waitForTimeout(400);

    // Type a realistic comment
    await textarea.type('The full-width button makes this really easy to tap on mobile too.', { delay: 36 });
    await page.waitForTimeout(500);

    // Hover the full-width Send button
    try {
      const sendBtn = page.getByRole('button', { name: /send/i });
      await sendBtn.hover({ force: true });
      await page.waitForTimeout(600);
    } catch (_) {}

    // Rest
    await page.mouse.move(W * 0.5, H * 0.1, { steps: 10 });
    await page.waitForTimeout(300);
  } catch (err) {
    try {
      await page.mouse.move(W / 2, H / 2, { steps: 8 });
      await page.waitForTimeout(400);
    } catch (_) {}
  }
}
