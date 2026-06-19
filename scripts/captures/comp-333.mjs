/**
 * Choreography: comp-333
 * Command dialog (⌘K) — click the "Search" trigger button, CommandDialog opens
 * with grouped command items. Type to filter, hover items, then close.
 */
export default async function capture(page, { W, H, wait }) {
  // 1. Mount settle
  try { await wait(800); } catch (_) {}

  // 2. Click the search trigger button
  try {
    await page.getByRole('button', { name: /search/i }).first().click({ timeout: 2500 });
    await wait(800);
  } catch (_) {
    try { await page.mouse.click(W / 2, H / 2); await wait(800); } catch (_) {}
  }

  // 3. Dwell on the open CommandDialog showing Quick start items
  try { await wait(1200); } catch (_) {}

  // 4. Hover the first command item "New folder"
  try {
    const item = page.getByText('New folder').first();
    await item.hover({ timeout: 2500 });
    await wait(600);
  } catch (_) {}

  // 5. Hover "Go to dashboard"
  try {
    const item = page.getByText('Go to dashboard').first();
    await item.hover({ timeout: 2500 });
    await wait(600);
  } catch (_) {}

  // 6. Type in the command input to filter
  try {
    await page.keyboard.type('folder', { delay: 80 });
    await wait(800);
  } catch (_) {}

  // 7. Dwell on filtered results
  try { await wait(600); } catch (_) {}

  // 8. Close via Escape
  try { await page.keyboard.press('Escape'); await wait(400); } catch (_) {}
}
