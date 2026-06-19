/**
 * Capture choreography for GradualBlur-TS-TW
 *
 * GradualBlur renders a stack of `backdrop-filter: blur(...)` divs with a
 * mask gradient, positioned absolutely over the bottom edge of its parent
 * (default: `position:'bottom'`, `height:'6rem'`, `strength:2`).
 * The effect is purely CSS/visual — no interaction is required to activate it.
 * `animated=false` by default so there is no CSS transition to trigger.
 *
 * The demo renders `<GradualBlur />` with no children and no parent content,
 * so the visible result is just the blur overlay band at the parent's bottom.
 *
 * Strategy:
 *   1. Dwell for mount settle.
 *   2. Move mouse slowly from top to bottom of the container so the blur band
 *      at the bottom edge is clearly visible as the cursor approaches it.
 *   3. Pause at the blur zone so the gradual blur gradient is the focus.
 *   4. Drift back to top-centre for the loop seam.
 */
export default async function capture(page, { W, H, wait }) {
  // Mount settle
  try {
    await wait(600);
  } catch (_) {}

  // Slow downward drift to reveal the blur band at the bottom
  try {
    await page.mouse.move(W / 2, H * 0.1, { steps: 8 });
    await wait(200);
    await page.mouse.move(W / 2, H * 0.85, { steps: 30 });
    await wait(600);
  } catch (_) {}

  // Pan horizontally along the blur zone to show the full-width gradient
  try {
    await page.mouse.move(W * 0.2, H * 0.88, { steps: 16 });
    await wait(300);
    await page.mouse.move(W * 0.8, H * 0.88, { steps: 20 });
    await wait(300);
  } catch (_) {}

  // Drift back up to top-centre for a clean loop seam
  try {
    await page.mouse.move(W / 2, H * 0.1, { steps: 24 });
    await wait(400);
  } catch (_) {}
}
