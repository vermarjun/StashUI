/**
 * Capture choreography for comp-56
 * Type: TAG INPUT (stacked) — Emblor TagInput with inputFieldPosition="top" and
 * inlineTags=false. Existing tags (Sport, Coding, Travel) appear below the input field.
 * Sequence: focus input → type a new tag → press Enter to add → hover an existing tag → end.
 */
export default async function choreograph({ page, W, H }) {
  await page.waitForTimeout(600);

  try {
    // Focus the tag text input at the top
    const tagInput = page.getByPlaceholder('Add a tag');
    await tagInput.waitFor({ state: 'visible', timeout: 4000 });
    await tagInput.click();
    await page.waitForTimeout(300);

    // Type a new tag
    await tagInput.type('Design', { delay: 90 });
    await page.waitForTimeout(500);

    // Press Enter to commit the tag
    await page.keyboard.press('Enter');
    await page.waitForTimeout(700);

    // Hover over the first existing tag ("Sport") to show its close button
    try {
      const sportTag = page.getByText('Sport').first();
      await sportTag.hover();
      await page.waitForTimeout(600);
    } catch (_) {}

    // Hover over "Coding" tag
    try {
      const codingTag = page.getByText('Coding').first();
      await codingTag.hover();
      await page.waitForTimeout(500);
    } catch (_) {}
  } catch (err) {
    try {
      const input = page.locator('input[placeholder]').first();
      await input.click();
      await page.waitForTimeout(300);
      await input.type('Design', { delay: 90 });
      await page.waitForTimeout(500);
      await page.keyboard.press('Enter');
      await page.waitForTimeout(700);
    } catch (_) {}
  }

  // End near centre
  try {
    await page.mouse.move(W * 0.5, H * 0.5, { steps: 10 });
    await page.waitForTimeout(300);
  } catch (_) {}
}
