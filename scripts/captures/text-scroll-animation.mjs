/**
 * Choreography: text-scroll-animation  (source: scroll-text-animation.tsx)
 * Behavior: multiple tall sections each containing a whileInView text reveal; user must
 *           scroll down through ~4 × 80vh sections to trigger all animations.
 * Strategy: top-aligned, scroll true — start at top, wheel down through all sections,
 *           pause at each to let the animation fire, then scroll back to top.
 */
export default async function choreograph(page, { W, H }) {
  // Start at top.
  try {
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
    await page.waitForTimeout(600);
  } catch (e) {}

  // Move mouse to center for wheel events.
  try {
    await page.mouse.move(W / 2, H / 2);
  } catch (e) {}

  // Scroll through section 1 → 2 (past the 550px intro).
  try {
    await page.mouse.wheel(0, 600);
    await page.waitForTimeout(800);
  } catch (e) {}

  // Section 2: "Creative ideas start here"
  try {
    await page.mouse.wheel(0, 700);
    await page.waitForTimeout(900);
  } catch (e) {}

  // Section 3: "Let's team up..."
  try {
    await page.mouse.wheel(0, 700);
    await page.waitForTimeout(900);
  } catch (e) {}

  // Section 4: "Turning concepts into reality"
  try {
    await page.mouse.wheel(0, 700);
    await page.waitForTimeout(900);
  } catch (e) {}

  // Section 5: "Dream big..."
  try {
    await page.mouse.wheel(0, 700);
    await page.waitForTimeout(900);
  } catch (e) {}

  // Dwell at bottom.
  try {
    await page.waitForTimeout(800);
  } catch (e) {}

  // Scroll back to top.
  try {
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'smooth' }));
    await page.waitForTimeout(1000);
  } catch (e) {}
}
