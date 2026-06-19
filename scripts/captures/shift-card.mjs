/**
 * Capture choreography for shift-card
 *
 * ShiftCard behaviour on hover/click:
 *   - whileHover: scale 1.02 (card lifts slightly)
 *   - isHovered = true:
 *       - topAnimateContent appears (AnimatePresence)
 *       - middleContent disappears (AnimatePresence)
 *       - ShiftCardContent animates height 38 → 194 (bottom panel slides up)
 *
 * The component also responds to onClick (handleTapStart sets hovered=true,
 * handleTap/TapCancel resets). We use hover first, then click to toggle.
 *
 * Strategy:
 *   1. Settle — resting state visible (middleContent, collapsed bottom).
 *   2. Hover onto card — shift triggers: bottom panel expands, middle hides,
 *      top animate content appears, card scales up.
 *   3. Dwell on hover to show expanded state.
 *   4. Mouse away — card collapses back.
 *   5. Pause in resting state.
 *   6. Click the card — triggers same shift via onClick.
 *   7. Dwell.
 *   8. Click again to collapse (onTap resets hovered).
 *   9. End near neutral.
 */
export default async function capture(page, { W, H, wait }) {
  const cx = W / 2;
  const cy = H / 2;

  // Settle off-card
  try {
    await wait(500);
    await page.mouse.move(cx, H * 0.08, { steps: 6 });
    await wait(300);
  } catch (_) {}

  // Hover onto card — shift reveal
  try {
    await page.mouse.move(cx, cy, { steps: 20 });
    await wait(1100);
  } catch (_) {}

  // Dwell showing expanded bottom panel
  try {
    await wait(300);
  } catch (_) {}

  // Mouse away — card collapses
  try {
    await page.mouse.move(cx + 240, H * 0.1, { steps: 18 });
    await wait(700);
  } catch (_) {}

  // Click to trigger shift via onClick
  try {
    await page.mouse.move(cx, cy, { steps: 14 });
    await wait(200);
    await page.mouse.click(cx, cy);
    await wait(900);
  } catch (_) {}

  // Click again to reset (onTap handler resets hovered)
  try {
    await page.mouse.click(cx, cy);
    await wait(700);
  } catch (_) {}

  // End near card centre / neutral
  try {
    await page.mouse.move(cx, H * 0.1, { steps: 12 });
    await wait(400);
  } catch (_) {}
}
