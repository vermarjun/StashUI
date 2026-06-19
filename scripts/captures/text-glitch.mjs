/**
 * Capture choreography for text-glitch.
 *
 * Behaviour: the demo renders two instances —
 *   1. "GLITCH"   — enableOnHover=false (always glitching, auto-play)
 *   2. "HOVER ME" — enableOnHover=true  (glitch only while cursor is over it)
 * Strategy:
 *   - Dwell ~2 s on the auto-glitch to show the clip-path animation in action.
 *   - Move mouse slowly over "HOVER ME" to trigger its glitch effect, dwell ~2 s.
 *   - Move mouse away so it resets, brief pause.
 *   - Return mouse near top to close the loop.
 */
export default async function capture(page, { W, H, wait }) {
  // Start: park cursor in top-right corner, clear of both text elements.
  try {
    await page.mouse.move(Math.round(W * 0.9), Math.round(H * 0.05), { steps: 4 });
  } catch (_) {}

  // Let the component mount; auto-glitch CSS animation starts immediately.
  try {
    await wait(400);
  } catch (_) {}

  // Dwell ~2 s to capture the always-on glitch animation on "GLITCH".
  try {
    await wait(2000);
  } catch (_) {}

  // Locate "HOVER ME" text — it is the second element in the flex column.
  // The demo is a flex-col with gap-12, centre-aligned at ~60–75 % of height.
  let hoverBox;
  try {
    // Query by data-text attribute which holds the text value.
    const el = page.locator('[data-text="HOVER ME"]').first();
    await el.waitFor({ state: 'visible', timeout: 5000 });
    hoverBox = await el.boundingBox();
  } catch (_) {
    // Fallback: lower-centre region of the viewport.
    hoverBox = {
      x: W * 0.2,
      y: H * 0.6,
      width: W * 0.6,
      height: H * 0.15,
    };
  }

  const hx = hoverBox.x + hoverBox.width * 0.5;
  const hy = hoverBox.y + hoverBox.height * 0.5;

  // Move onto "HOVER ME" to trigger the hover glitch.
  try {
    await page.mouse.move(hx, hy, { steps: 12 });
    await wait(300);
  } catch (_) {}

  // Dwell ~2 s while the glitch effect plays on hover.
  try {
    await wait(2000);
  } catch (_) {}

  // Move mouse away to reset hover state.
  try {
    await page.mouse.move(Math.round(W * 0.9), Math.round(H * 0.5), { steps: 10 });
    await wait(400);
  } catch (_) {}

  // Return to start position for a clean loop seam.
  try {
    await page.mouse.move(Math.round(W * 0.9), Math.round(H * 0.05), { steps: 6 });
    await wait(200);
  } catch (_) {}
}
