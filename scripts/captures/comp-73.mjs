/**
 * Capture choreography for comp-73
 * Textarea with an inset label (label sits inside the top of the unified border box).
 * Sequence: click textarea body → type content → move away (~3.5s).
 */
export default async function capture({ page, W, H }) {
  try {
    const textarea = page.locator('textarea').first();
    await textarea.waitFor({ state: 'visible', timeout: 3000 });

    await page.mouse.move(W * 0.8, H * 0.1, { steps: 8 });
    await page.waitForTimeout(300);

    // Click to focus the inner textarea
    await textarea.click({ force: true });
    await page.waitForTimeout(450);

    // Type realistic content
    await textarea.type('Inset labels keep the form compact without losing context — really clean.', { delay: 37 });
    await page.waitForTimeout(500);

    // Move away
    await page.mouse.move(W * 0.8, H * 0.85, { steps: 12 });
    await page.waitForTimeout(300);
  } catch (err) {
    try {
      await page.mouse.move(W / 2, H / 2, { steps: 8 });
      await page.waitForTimeout(400);
    } catch (_) {}
  }
}
