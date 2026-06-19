/**
 * Capture choreography for card-spotlight.
 *
 * Effect: a masked radial gradient reveals a dark spotlight under the cursor;
 * when hovering, a CanvasRevealEffect (blue + violet particles) fires inside
 * the spotlight. The spotlight strictly follows the cursor position.
 * Strategy: enter top-left → slow sweep across the card so the spotlight
 * visibly tracks → pause at centre to show the full particle burst →
 * drift to bottom-right corner → leave so the card returns to its dark state.
 */
export default async function capture(page, { W, H, cfg, wait }) {
  // CardSpotlight renders a div with class containing "group/spotlight"
  // Fall back to a centred bounding box if selector misses
  const card = page.locator('[class*="group\\/spotlight"]').first();

  let box;
  try {
    await card.waitFor({ state: "visible", timeout: 8000 });
    box = await card.boundingBox();
  } catch {
    box = { x: W * 0.28, y: H * 0.15, width: W * 0.44, height: H * 0.6 };
  }

  const { x, y, width, height } = box;
  const cx = x + width / 2;
  const cy = y + height / 2;

  await wait(600);

  // Enter at top-left — spotlight appears, particles start
  try {
    await page.mouse.move(x + width * 0.12, y + height * 0.12);
    await wait(300);
  } catch { /* continue */ }

  // Sweep slowly across to the right
  const hSteps = 30;
  try {
    for (let i = 0; i <= hSteps; i++) {
      const t = i / hSteps;
      await page.mouse.move(x + width * (0.12 + 0.76 * t), y + height * 0.3);
      await wait(30);
    }
    await wait(300);
  } catch { /* continue */ }

  // Sweep down the right side
  const vSteps = 20;
  try {
    for (let i = 0; i <= vSteps; i++) {
      const t = i / vSteps;
      await page.mouse.move(x + width * 0.85, y + height * (0.3 + 0.5 * t));
      await wait(30);
    }
    await wait(250);
  } catch { /* continue */ }

  // Drift to centre — full particle burst visible
  try {
    await page.mouse.move(cx, cy);
    await wait(700);
  } catch { /* continue */ }

  // Drift to bottom-left
  try {
    await page.mouse.move(x + width * 0.2, y + height * 0.82);
    await wait(350);
  } catch { /* continue */ }

  // Leave — spotlight fades out
  try {
    await page.mouse.move(x - 80, cy);
    await wait(500);
  } catch { /* continue */ }
}
