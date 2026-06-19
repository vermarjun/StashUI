/**
 * Capture choreography for comp-71
 * Textarea with a static overlapping label (label lives above the border, always visible).
 * Sequence: click textarea → type multi-line content → move away (~3.5s).
 */
export default async function capture({ page, W, H }) {
  try {
    const textarea = page.locator('textarea').first();
    await textarea.waitFor({ state: 'visible', timeout: 3000 });

    await page.mouse.move(W * 0.8, H * 0.1, { steps: 8 });
    await page.waitForTimeout(300);

    // Click to focus — the overlapping label is already visible
    await textarea.click({ force: true });
    await page.waitForTimeout(450);

    // Type realistic paragraph content
    await textarea.type('Great component library — the overlapping label is a nice touch for saving vertical space.', { delay: 35 });
    await page.waitForTimeout(500);

    // Move away to rest
    await page.mouse.move(W * 0.8, H * 0.85, { steps: 12 });
    await page.waitForTimeout(300);
  } catch (err) {
    try {
      await page.mouse.move(W / 2, H / 2, { steps: 8 });
      await page.waitForTimeout(400);
    } catch (_) {}
  }
}
