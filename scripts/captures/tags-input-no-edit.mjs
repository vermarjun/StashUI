/**
 * Capture choreography for tags-input-no-edit
 *
 * Uses TagsInput with editTag={false} and starts with an empty tag list.
 * Strategy: type 3 tags and press Enter after each so the blue chips appear.
 * Clicking a chip does nothing (no-edit mode) so we skip that step.
 */
export default async function capture(page, { W, H, wait }) {
  try {
    try { await wait(400); } catch (_) {}

    // Click the "Add a tag..." input
    try {
      await page.getByPlaceholder('Add a tag...').click();
    } catch (_) {}
    try { await wait(200); } catch (_) {}

    // Add tag 1: "Design"
    try {
      await page.getByPlaceholder('Add a tag...').type('Design', { delay: 80 });
    } catch (_) {}
    try { await page.keyboard.press('Enter'); } catch (_) {}
    try { await wait(350); } catch (_) {}

    // Add tag 2: "Motion"
    try {
      await page.getByPlaceholder('Add a tag...').type('Motion', { delay: 80 });
    } catch (_) {}
    try { await page.keyboard.press('Enter'); } catch (_) {}
    try { await wait(350); } catch (_) {}

    // Add tag 3: "UI"
    try {
      await page.getByPlaceholder('Add a tag...').type('UI', { delay: 80 });
    } catch (_) {}
    try { await page.keyboard.press('Enter'); } catch (_) {}
    try { await wait(500); } catch (_) {}

    // Try clicking a chip — should do nothing in no-edit mode
    try {
      await page.locator('div.bg-blue-500').first().click();
    } catch (_) {}
    try { await wait(300); } catch (_) {}
  } catch (err) {
    console.error('tags-input-no-edit capture error:', err);
  }
}
