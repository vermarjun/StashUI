/**
 * Capture choreography for comp-57
 * Type: TAG INPUT (inline) — Emblor TagInput with inline tags rendered inside the input
 * container. Initial tag "Red" is present.
 * Sequence: click inside input area → type a new tag → Enter → type another → Enter →
 * hover first tag (close button reveals) → end near start.
 */
export default async function choreograph({ page, W, H }) {
  await page.waitForTimeout(600);

  try {
    // Click the inner text input
    const tagInput = page.getByPlaceholder('Add a tag');
    await tagInput.waitFor({ state: 'visible', timeout: 4000 });
    await tagInput.click();
    await page.waitForTimeout(300);

    // Type and commit first new tag
    await tagInput.type('Blue', { delay: 100 });
    await page.waitForTimeout(400);
    await page.keyboard.press('Enter');
    await page.waitForTimeout(600);

    // Type and commit second new tag
    await tagInput.type('Green', { delay: 100 });
    await page.waitForTimeout(400);
    await page.keyboard.press('Enter');
    await page.waitForTimeout(600);

    // Hover the "Red" tag to reveal its close button
    try {
      const redTag = page.getByText('Red').first();
      await redTag.hover();
      await page.waitForTimeout(600);
    } catch (_) {}
  } catch (err) {
    try {
      const input = page.locator('input[placeholder]').first();
      await input.click();
      await page.waitForTimeout(300);
      await input.type('Blue', { delay: 100 });
      await page.waitForTimeout(400);
      await page.keyboard.press('Enter');
      await page.waitForTimeout(600);
      await input.type('Green', { delay: 100 });
      await page.waitForTimeout(400);
      await page.keyboard.press('Enter');
      await page.waitForTimeout(600);
    } catch (_) {}
  }

  // End near centre
  try {
    await page.mouse.move(W * 0.5, H * 0.5, { steps: 10 });
    await page.waitForTimeout(300);
  } catch (_) {}
}
