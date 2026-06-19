/**
 * Capture choreography for comet-card.
 *
 * Effect: the card tilts in 3-D (rotateX/Y) and a glare oval follows
 * the pointer across the surface, simulating a comet light. On hover
 * the card also scales up slightly (whileHover scale 1.05).
 * Strategy: enter card top-left → slow sweep to bottom-right (diagonal)
 * so both tilt axes and the glare comet are fully visible → arc back to
 * top-right corner → dwell at centre → leave so the card returns flat.
 */
export default async function capture(page, { W, H, cfg, wait }) {
  // CometCard outer div has class "perspective-distant transform-3d"
  // The inner motion.div has rounded-2xl — use the outer wrapper
  const card = page.locator('[class*="perspective-distant"]').first();

  let box;
  try {
    await card.waitFor({ state: "visible", timeout: 8000 });
    box = await card.boundingBox();
  } catch {
    box = { x: W * 0.3, y: H * 0.1, width: W * 0.4, height: H * 0.75 };
  }

  const { x, y, width, height } = box;
  const cx = x + width / 2;
  const cy = y + height / 2;

  await wait(700);

  // Enter at top-left
  try {
    await page.mouse.move(x + width * 0.1, y + height * 0.1);
    await wait(250);
  } catch { /* continue */ }

  // Slow diagonal sweep top-left → bottom-right (comet tracks across)
  const diagSteps = 38;
  try {
    for (let i = 0; i <= diagSteps; i++) {
      const t = i / diagSteps;
      await page.mouse.move(
        x + width * (0.1 + 0.8 * t),
        y + height * (0.1 + 0.8 * t),
      );
      await wait(24);
    }
    await wait(350);
  } catch { /* continue */ }

  // Arc back: bottom-right → top-right (horizontal glare sweep)
  const arcSteps = 20;
  try {
    for (let i = 0; i <= arcSteps; i++) {
      const t = i / arcSteps;
      await page.mouse.move(
        x + width * (0.9 - 0.8 * t),
        y + height * (0.9 - 0.8 * t),
      );
      await wait(28);
    }
    await wait(300);
  } catch { /* continue */ }

  // Dwell at centre — glare at 50 % / 50 %, card flat in perspective
  try {
    await page.mouse.move(cx, cy);
    await wait(600);
  } catch { /* continue */ }

  // Nudge to right edge — strong rotateY tilt visible
  try {
    await page.mouse.move(x + width * 0.88, cy);
    await wait(350);
  } catch { /* continue */ }

  // Leave — card and glare return to rest
  try {
    await page.mouse.move(x - 80, cy);
    await wait(500);
  } catch { /* continue */ }
}
