/**
 * Capture choreography for comp-77
 * Autogrowing textarea — starts as a single line and expands vertically as content
 * is added (field-sizing:content).
 * Sequence: click → type a short line → pause → type more lines → watch it grow →
 * move away (~5s).
 */
export default async function capture({ page, W, H }) {
  try {
    const textarea = page.locator('textarea').first();
    await textarea.waitFor({ state: 'visible', timeout: 3000 });

    await page.mouse.move(W * 0.8, H * 0.15, { steps: 8 });
    await page.waitForTimeout(300);

    // Focus
    await textarea.click({ force: true });
    await page.waitForTimeout(400);

    // Type first line — textarea starts compact
    await textarea.type('Autogrowing textarea starts small.', { delay: 42 });
    await page.waitForTimeout(500);

    // Add a newline and more text — watch it expand
    await page.keyboard.press('Enter');
    await textarea.type('As you type more content it expands automatically.', { delay: 38 });
    await page.waitForTimeout(400);

    await page.keyboard.press('Enter');
    await textarea.type('No manual resize needed — it just flows with the content.', { delay: 36 });
    await page.waitForTimeout(600);

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
