/**
 * Capture choreography for: halo-search
 * Behaviour: A dark search input is ringed by layered conic-gradient aurora
 * glows. On hover the gradients shift position; on focus they spin a full
 * rotation (4 s transition). Moving the mouse shows the hover state live.
 * Choreography: rest → glide mouse over search bar (hover glow shift) →
 * click to focus (aurora spin starts) → type a query → dwell showing the
 * spinning aurora → blur → rest.
 */
export default async function capture(page, { W, H, cfg, wait }) {
  // Let entrance styles settle
  await wait(500);

  // --- Hover the search bar to trigger the hover aurora shift ---
  try {
    const searchInput = page.locator('input.search-field').first();
    const box = await searchInput.boundingBox({ timeout: 3000 });
    if (!box) throw new Error('search-field not found');

    // Glide in from outside
    await page.mouse.move(box.x - 40, box.y + box.height / 2, { steps: 10 });
    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2, { steps: 14 });
    await wait(700); // hover CSS transition (2 s) — show partial shift
  } catch (err) {
    console.error('[halo-search] hover error:', err.message);
  }

  // --- Click to focus → aurora spin begins (4 s CSS transition) ---
  try {
    const searchInput = page.locator('input.search-field').first();
    await searchInput.click({ timeout: 2000 });
    await wait(500); // let focus-within styles trigger
  } catch (err) {
    console.error('[halo-search] focus click error:', err.message);
  }

  // --- Type a realistic query ---
  try {
    await page.keyboard.type('react component library', { delay: 75 });
    await wait(800);
  } catch (err) {
    console.error('[halo-search] type error:', err.message);
  }

  // --- Move mouse slightly within the bar (keep focus + show glow is live) ---
  try {
    const searchInput = page.locator('input.search-field').first();
    const box = await searchInput.boundingBox({ timeout: 2000 });
    if (box) {
      await page.mouse.move(box.x + box.width * 0.3, box.y + box.height / 2, { steps: 8 });
      await wait(400);
      await page.mouse.move(box.x + box.width * 0.7, box.y + box.height / 2, { steps: 8 });
      await wait(400);
    }
  } catch (err) {
    console.error('[halo-search] mouse move in bar error:', err.message);
  }

  // --- Dwell to let the spinning aurora fully play ---
  await wait(1000);

  // --- Blur and move mouse away — aurora resets ---
  try {
    const searchInput = page.locator('input.search-field').first();
    await searchInput.blur();
    await wait(300);
    await page.mouse.move(W / 2, H * 0.1, { steps: 10 });
  } catch { /* ignore */ }
  await wait(400);
}
