/**
 * Capture choreography for comp-72
 * Textarea with an animated floating label — label shrinks and rises on focus/content.
 * Sequence: hover → click to focus (label animates up) → type content → move away (~4s).
 */
export default async function capture({ page, W, H }) {
  try {
    const textarea = page.locator('textarea').first();
    await textarea.waitFor({ state: 'visible', timeout: 3000 });

    // Start away so we can see the default (label in center) state briefly
    await page.mouse.move(W * 0.8, H * 0.15, { steps: 8 });
    await page.waitForTimeout(500);

    // Click to trigger the label animation
    await textarea.click({ force: true });
    await page.waitForTimeout(600); // let animation play

    // Type realistic content
    await textarea.type('The floating label animation gives this a polished, modern feel.', { delay: 40 });
    await page.waitForTimeout(500);

    // Move away — label stays up because field has content
    await page.mouse.move(W * 0.8, H * 0.85, { steps: 12 });
    await page.waitForTimeout(350);
  } catch (err) {
    try {
      await page.mouse.move(W / 2, H / 2, { steps: 8 });
      await page.waitForTimeout(400);
    } catch (_) {}
  }
}
