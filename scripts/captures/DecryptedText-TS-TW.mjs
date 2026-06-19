/**
 * Capture choreography for DecryptedText-TS-TW
 *
 * The demo has three instances:
 *   1. animateOn="hover"  — scramble → decrypt on hover
 *   2. animateOn="view"   — auto-decrypts when in view (fires on mount)
 *   3. animateOn="click", clickMode="toggle" — click to reveal/re-scramble
 *
 * Strategy:
 *   1. Wait ~800 ms for the view-triggered instance to finish decrypting.
 *   2. Hover the first line to trigger its hover-decrypt, dwell.
 *   3. Move away so the first line re-scrambles.
 *   4. Click the third line to toggle decrypt on, dwell.
 *   5. Click again to toggle back to scrambled state.
 *   6. Return mouse near centre for loop seam.
 */
export default async function capture(page, { W, H, wait }) {
  // Wait for view-triggered decrypt to finish
  try {
    await wait(800);
  } catch (_) {}

  // Hover the first line (top third of the container)
  try {
    await page.mouse.move(W / 2, H * 0.25, { steps: 14 });
    await wait(1500);
  } catch (_) {}

  // Move away from the first line (re-scrambles)
  try {
    await page.mouse.move(W / 2, H * 0.85, { steps: 14 });
    await wait(600);
  } catch (_) {}

  // Click the third line (click-toggle decrypt) — bottom third
  try {
    await page.mouse.click(W / 2, H * 0.75);
    await wait(1500);
  } catch (_) {}

  // Toggle back to scrambled
  try {
    await page.mouse.click(W / 2, H * 0.75);
    await wait(500);
  } catch (_) {}

  // Return to centre for loop seam
  try {
    await page.mouse.move(W / 2, H / 2, { steps: 12 });
    await wait(300);
  } catch (_) {}
}
