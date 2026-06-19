/**
 * Capture choreography for comp-454
 * Pagination: Previous / Next button pair (simple prev-next only, no page numbers).
 * Sequence: dwell → click Next → dwell → click Next again → rest near start.
 */
export default async function capture(page, { W, H, wait }) {
  const cx = W / 2;
  const cy = H / 2;

  await wait(500);

  // Dwell on pagination
  try {
    await page.mouse.move(cx, cy, { steps: 10 });
    await wait(600);
  } catch (_) {}

  // Click "Next" button (page 1 → 2)
  try {
    const nextBtn = page.getByRole('link', { name: /next/i });
    await nextBtn.waitFor({ state: 'visible', timeout: 4000 });
    await nextBtn.click();
    await wait(900);
  } catch (err) {
    try {
      await page.mouse.move(cx + 80, cy, { steps: 8 });
      await page.mouse.click(cx + 80, cy);
      await wait(900);
    } catch (_) {}
  }

  // Click "Next" again (page 2 → 3)
  try {
    const nextBtn = page.getByRole('link', { name: /next/i });
    await nextBtn.waitFor({ state: 'visible', timeout: 3000 });
    await nextBtn.click();
    await wait(900);
  } catch (err) {
    try {
      await page.mouse.move(cx + 80, cy, { steps: 8 });
      await page.mouse.click(cx + 80, cy);
      await wait(900);
    } catch (_) {}
  }

  // Click "Previous" to move back (end near start state)
  try {
    const prevBtn = page.getByRole('link', { name: /previous/i });
    await prevBtn.waitFor({ state: 'visible', timeout: 3000 });
    await prevBtn.click();
    await wait(600);
  } catch (err) {
    try {
      await page.mouse.move(cx - 80, cy, { steps: 8 });
      await page.mouse.click(cx - 80, cy);
      await wait(600);
    } catch (_) {}
  }

  // End near center
  try {
    await page.mouse.move(cx, cy, { steps: 8 });
    await wait(300);
  } catch (_) {}
}
