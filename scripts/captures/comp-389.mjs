/**
 * Capture choreography for comp-389
 * Tour popover with anchor — a 2×2 grid of numbered cards (1-4) plus a "Start tour" button.
 * Clicking "Start tour" opens a popover anchored to the active card. Each "Next" click
 * advances the anchor to the next card and updates the tooltip content. The popover
 * side alternates left/right per step.
 * Sequence: click "Start tour" → dwell on step 1 (Heart) → click Next → dwell step 2
 *           (Diamond) → click Next → dwell step 3 (Club) → move away.
 */
export default async function capture(page, { W, H, cfg, wait }) {
  const cx = W / 2;
  const cy = H / 2;

  try {
    // Click "Start tour" to open the popover at card 1
    const startBtn = page.getByRole('button', { name: /start tour/i });
    await startBtn.waitFor({ state: 'visible', timeout: 4000 });
    await startBtn.click();

    // Dwell on step 1 — "Heart" popover anchored to card 1 (left side)
    await wait(1500);

    // Advance to step 2 — "Diamond"
    try {
      const nextBtn = page.getByRole('button', { name: /^next$/i });
      await nextBtn.waitFor({ state: 'visible', timeout: 2000 });
      await nextBtn.click();
      // Dwell on step 2 (popover anchored to card 2, right side)
      await wait(1400);

      // Advance to step 3 — "Club"
      await nextBtn.click();
      await wait(1400);
    } catch (e) {
      // Fallback: try text-based locator
      try {
        const nextFallback = page.locator('button', { hasText: 'Next' });
        await nextFallback.click();
        await wait(1400);
      } catch (_) {}
    }

    // Move mouse away from the popover region
    await page.mouse.move(cx, cy + 160, { steps: 12 });
    await wait(400);
  } catch (err) {
    try {
      await page.mouse.move(cx, cy);
      await wait(500);
      await page.mouse.move(cx, cy + 160, { steps: 10 });
      await wait(300);
    } catch (_) {}
  }
}
