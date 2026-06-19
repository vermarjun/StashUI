/**
 * Choreography: command
 * Clicks the search trigger to open the CommandDialog, types to filter,
 * dwells on results, then closes via Escape.
 */
export default async function capture(page, { W, H, wait }) {
  // 1. Mount settle
  try { await wait(800); } catch (_) {}

  // 2. Click the "Search commands…" trigger button
  try {
    const btn = page.getByRole("button", { name: /search commands/i }).first();
    const box = await btn.boundingBox();
    if (box) {
      await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2, { steps: 8 });
      await wait(150);
      await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
    } else {
      // Fallback: click center
      await page.mouse.click(W / 2, H / 2);
    }
    await wait(800);
  } catch (_) {}

  // 3. Dwell with the command list open
  try { await wait(1000); } catch (_) {}

  // 4. Type to filter
  try {
    await page.keyboard.type("cal", { delay: 80 });
    await wait(700);
  } catch (_) {}

  // 5. Dwell on filtered results
  try { await wait(1000); } catch (_) {}

  // 6. Close via Escape
  try {
    await page.keyboard.press("Escape");
    await wait(500);
  } catch (_) {}

  // 7. Settle
  try { await wait(300); } catch (_) {}
}
