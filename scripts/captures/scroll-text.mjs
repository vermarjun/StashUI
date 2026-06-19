/**
 * Choreography: scroll-text
 * Behavior: whileInView text reveal (blur + translate) — each block animates when it enters
 *           the viewport. Demo has 3 blocks that are already visible on load (short container).
 * Strategy: top-aligned, scroll true — start at top, wheel down slowly to ensure all
 *           whileInView triggers fire, then scroll back to top.
 */
export default async function choreograph(page, { W, H }) {
  // Start at top — first block should animate in immediately.
  try {
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
    await page.waitForTimeout(800);
  } catch (e) {}

  // Wheel down gently to expose any blocks below the fold.
  try {
    await page.mouse.move(W / 2, H / 2);
    await page.mouse.wheel(0, 300);
    await page.waitForTimeout(600);
    await page.mouse.wheel(0, 300);
    await page.waitForTimeout(600);
    await page.mouse.wheel(0, 300);
    await page.waitForTimeout(900);
  } catch (e) {}

  // Dwell at bottom with all blocks visible.
  try {
    await page.waitForTimeout(1200);
  } catch (e) {}

  // Scroll back to top.
  try {
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'smooth' }));
    await page.waitForTimeout(900);
  } catch (e) {}
}
