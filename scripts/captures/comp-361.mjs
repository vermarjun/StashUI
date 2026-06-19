/**
 * Capture choreography for comp-361
 * Tooltip with stats — a "Stats" outline button triggers a tooltip listing
 * Status, Code Coverage, Last Deploy, and Performance Score. Hidden until hover.
 * Sequence: hover trigger → dwell ~2s while stats tooltip is visible → move away.
 */
export default async function capture(page, { W, H, cfg, wait }) {
  const cx = W / 2;
  const cy = H / 2;

  try {
    // Locate the trigger button by its label
    const trigger = page.getByRole('button', { name: /^stats$/i });
    await trigger.waitFor({ state: 'visible', timeout: 4000 });

    // Hover over the trigger to reveal the stats tooltip
    await trigger.hover();

    // Dwell while the tooltip is fully shown
    await wait(2000);

    // Move mouse away to dismiss
    await page.mouse.move(cx + 120, cy + 100, { steps: 12 });
    await wait(400);
  } catch (err) {
    try {
      await page.mouse.move(cx, cy);
      await wait(500);
      await page.mouse.move(cx + 120, cy + 100, { steps: 10 });
      await wait(300);
    } catch (_) {}
  }
}
