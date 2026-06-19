/**
 * Capture choreography for comp-386
 * Tooltip-like popover with arrow navigation — "Tooltip-like with nav" button opens a
 * popover showing paginated tips (1/5) with left/right arrow icon buttons for navigation.
 * Click-activated popover.
 * Sequence: click trigger → dwell on step 1 → click next arrow → dwell on step 2
 *           → click next arrow → dwell on step 3 → move away.
 */
export default async function capture(page, { W, H, cfg, wait }) {
  const cx = W / 2;
  const cy = H / 2;

  try {
    // Open the popover
    const trigger = page.getByRole('button', { name: /tooltip-like with nav/i });
    await trigger.waitFor({ state: 'visible', timeout: 4000 });
    await trigger.click();

    // Dwell on step 1 "Welcome to Dashboard"
    await wait(1400);

    // Click the "Next tip" arrow button to advance to step 2
    try {
      const nextArrow = page.getByRole('button', { name: /next tip/i });
      await nextArrow.waitFor({ state: 'visible', timeout: 2000 });
      await nextArrow.click();
      // Dwell on step 2 "Quick Actions"
      await wait(1400);

      // Advance to step 3
      await nextArrow.click();
      await wait(1200);
    } catch (e) {
      // Fallback: try aria-label next
      try {
        const arrows = page.locator('button[aria-label="Next tip"]');
        await arrows.first().click();
        await wait(1400);
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
