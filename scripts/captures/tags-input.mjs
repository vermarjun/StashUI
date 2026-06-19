/**
 * Capture choreography for tags-input
 *
 * TagsInput renders blue chip badges with a text input at the end.
 * Pre-seeded with ["React", "TypeScript", "Tailwind"].
 * Strategy: type a new tag and press Enter × 3 so three new chips appear,
 * then click an existing chip to enter edit mode (demonstrating editTag=true).
 */
export default async function capture(page, { W, H, wait }) {
  try {
    try { await wait(400); } catch (_) {}

    // Click the "Add a tag..." input
    try {
      await page.getByPlaceholder('Add a tag...').click();
    } catch (_) {}
    try { await wait(200); } catch (_) {}

    // Add tag 1: "Next.js"
    try {
      await page.getByPlaceholder('Add a tag...').type('Next.js', { delay: 80 });
    } catch (_) {}
    try { await page.keyboard.press('Enter'); } catch (_) {}
    try { await wait(350); } catch (_) {}

    // Add tag 2: "Framer"
    try {
      await page.getByPlaceholder('Add a tag...').type('Framer', { delay: 80 });
    } catch (_) {}
    try { await page.keyboard.press('Enter'); } catch (_) {}
    try { await wait(350); } catch (_) {}

    // Add tag 3: "Radix"
    try {
      await page.getByPlaceholder('Add a tag...').type('Radix', { delay: 80 });
    } catch (_) {}
    try { await page.keyboard.press('Enter'); } catch (_) {}
    try { await wait(400); } catch (_) {}

    // Click the first chip ("React") to demonstrate edit mode
    try {
      await page.locator('div.bg-blue-500').first().click();
    } catch (_) {}
    try { await wait(400); } catch (_) {}

    // Press Escape / blur to exit edit mode and return to stable chip state
    try { await page.keyboard.press('Escape'); } catch (_) {}
    try { await wait(300); } catch (_) {}
  } catch (err) {
    console.error('tags-input capture error:', err);
  }
}
