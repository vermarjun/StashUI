/**
 * Capture choreography for comp-359
 * Tooltip with an image — a small "W/ image" outline button triggers a rich tooltip
 * containing a preview image + title + description text. The tooltip is hidden until hover.
 * Sequence: hover trigger → dwell ~2s while tooltip (with image) is visible → move away.
 */
export default async function capture(page, { W, H, cfg, wait }) {
  const cx = W / 2;
  const cy = H / 2;

  try {
    // Locate the trigger button
    const trigger = page.getByRole('button', { name: /w\/ image/i });
    await trigger.waitFor({ state: 'visible', timeout: 4000 });

    // Hover over the trigger to reveal the tooltip
    await trigger.hover();

    // Dwell while the tooltip (image + text) is visible
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
