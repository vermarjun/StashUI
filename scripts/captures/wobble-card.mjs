/**
 * Capture choreography for wobble-card.
 *
 * Effect: the card translates toward the cursor and its inner layer
 * counter-translates (parallax), creating a physical wobble/tilt feel.
 * Strategy: enter the card at the top-left → sweep slowly to bottom-right
 * so both translation axes fire → arc back through centre → dwell → leave
 * so the card settles to the resting (flat) state.
 */
export default async function capture(page, { W, H, cfg, wait }) {
  // The outer motion.section has class that includes rounded-2xl
  const card = page.locator("section.rounded-2xl").first();

  let box;
  try {
    await card.waitFor({ state: "visible", timeout: 8000 });
    box = await card.boundingBox();
  } catch {
    box = { x: W * 0.3, y: H * 0.2, width: W * 0.4, height: H * 0.5 };
  }

  const { x, y, width, height } = box;
  const cx = x + width / 2;
  const cy = y + height / 2;

  // Settle before moving
  await wait(700);

  // Enter at top-left corner
  try {
    await page.mouse.move(x + width * 0.15, y + height * 0.15);
    await wait(200);
  } catch { /* continue */ }

  // Slow diagonal sweep top-left → bottom-right
  const sweepSteps = 40;
  try {
    for (let i = 0; i <= sweepSteps; i++) {
      const t = i / sweepSteps;
      await page.mouse.move(
        x + width * (0.15 + 0.7 * t),
        y + height * (0.15 + 0.7 * t),
      );
      await wait(22);
    }
    await wait(300);
  } catch { /* continue */ }

  // Arc: bottom-right → top-right edge
  const arcSteps = 20;
  try {
    for (let i = 0; i <= arcSteps; i++) {
      const t = i / arcSteps;
      await page.mouse.move(
        x + width * (0.85 - 0.0 * t),
        y + height * (0.85 - 0.7 * t),
      );
      await wait(28);
    }
    await wait(250);
  } catch { /* continue */ }

  // Dwell at centre — card fully flat in the middle
  try {
    await page.mouse.move(cx, cy);
    await wait(500);
  } catch { /* continue */ }

  // Nudge to left edge so tilt is visible before leaving
  try {
    await page.mouse.move(x + width * 0.1, cy);
    await wait(350);
  } catch { /* continue */ }

  // Leave — card springs back to rest
  try {
    await page.mouse.move(x - 80, cy);
    await wait(500);
  } catch { /* continue */ }
}
