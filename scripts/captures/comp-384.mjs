/**
 * Capture choreography for comp-384
 * Tooltip-like popover — "Tooltip-like popover" button opens a popover above it
 * containing a title, description text, and a "Know more" CTA button. This is a
 * click-activated popover (not hover), so we click the trigger then dwell while
 * the popup is visible.
 * Sequence: click trigger → dwell ~2s while popover is open → move away.
 */
export default async function capture(page, { W, H, cfg, wait }) {
  const cx = W / 2;
  const cy = H / 2;

  try {
    // Locate the trigger button
    const trigger = page.getByRole('button', { name: /tooltip-like popover/i });
    await trigger.waitFor({ state: 'visible', timeout: 4000 });

    // Click to open the popover (click-activated, not hover)
    await trigger.click();

    // Dwell while the popover with title + "Know more" button is shown
    await wait(2000);

    // Move mouse away (popover stays open until dismissed — that's fine for capture)
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
