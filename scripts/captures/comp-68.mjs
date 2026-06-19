/**
 * Capture choreography for comp-68
 * Textarea with a left-aligned "Send" button beneath it.
 * Sequence: click textarea → type comment → hover Send button → move away (~4s).
 */
export default async function capture({ page, W, H }) {
  try {
    const textarea = page.locator('textarea').first();
    await textarea.waitFor({ state: 'visible', timeout: 3000 });

    // Start mouse away from the field
    await page.mouse.move(W * 0.8, H * 0.15, { steps: 8 });
    await page.waitForTimeout(300);

    // Click to focus the textarea
    await textarea.click({ force: true });
    await page.waitForTimeout(400);

    // Type a realistic comment
    await textarea.type('This feature is really well designed — love the clean layout.', { delay: 38 });
    await page.waitForTimeout(500);

    // Hover the Send button
    try {
      const sendBtn = page.getByRole('button', { name: /send/i });
      await sendBtn.hover({ force: true });
      await page.waitForTimeout(600);
    } catch (_) {}

    // Move mouse away to rest
    await page.mouse.move(W * 0.8, H * 0.8, { steps: 10 });
    await page.waitForTimeout(300);
  } catch (err) {
    try {
      await page.mouse.move(W / 2, H / 2, { steps: 8 });
      await page.waitForTimeout(400);
    } catch (_) {}
  }
}
