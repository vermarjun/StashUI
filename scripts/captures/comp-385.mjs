/**
 * Capture choreography for comp-385
 * Tooltip-like popover with steps — "Tooltip-like with steps" button opens a popover
 * showing a paginated tip (1/3, 2/3, 3/3) with a "Next" / "Start over" inline button.
 * Click-activated popover.
 * Sequence: click trigger → dwell on step 1 → click "Next" → dwell on step 2 → move away.
 */
export default async function capture(page, { W, H, cfg, wait }) {
  const cx = W / 2;
  const cy = H / 2;

  try {
    // Open the popover
    const trigger = page.getByRole('button', { name: /tooltip-like with steps/i });
    await trigger.waitFor({ state: 'visible', timeout: 4000 });
    await trigger.click();

    // Dwell on step 1 "Welcome to Dashboard"
    await wait(1500);

    // Click "Next" to advance to step 2
    try {
      const nextBtn = page.getByRole('button', { name: /^next$/i });
      await nextBtn.waitFor({ state: 'visible', timeout: 2000 });
      await nextBtn.click();
      // Dwell on step 2 "Quick Actions"
      await wait(1500);
    } catch (e) {
      // Fallback: try clicking the next text button
      try {
        await page.locator('button', { hasText: 'Next' }).click();
        await wait(1500);
      } catch (_) {}
    }

    // Move mouse away
    await page.mouse.move(cx + 140, cy + 120, { steps: 12 });
    await wait(400);
  } catch (err) {
    try {
      await page.mouse.move(cx, cy);
      await wait(500);
      await page.mouse.move(cx + 140, cy + 120, { steps: 10 });
      await wait(300);
    } catch (_) {}
  }
}
