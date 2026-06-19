/**
 * Choreography: comp-275
 * Static alert banner — warning with action link, neutral border.
 * Settle, hover the "Link" anchor (shows arrow transition), dwell.
 */
export default async function capture(page, { W, H, wait }) {
  // 1. Settle
  try { await wait(700); } catch (_) {}

  // 2. Hover over the action link to trigger arrow animation
  try {
    await page.getByRole('link').first().hover({ timeout: 2500 });
    await wait(1200);
  } catch (_) {
    try {
      await page.mouse.move(W / 2, H / 2, { steps: 10 });
      await wait(1200);
    } catch (_) {}
  }

  // 3. Dwell
  try { await wait(1500); } catch (_) {}

  // 4. Move off the link
  try {
    await page.mouse.move(W / 2 - 60, H / 2, { steps: 8 });
    await wait(700);
  } catch (_) {}
}
