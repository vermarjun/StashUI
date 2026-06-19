/**
 * Capture choreography for evervault-card.
 *
 * Effect: a radial-gradient spotlight follows the cursor and reveals a
 * rainbow gradient + scrambled character rain. The gradient widens as you
 * move across different quadrants.
 * Strategy: enter card → slow arc across top-left → centre → bottom-right
 * → pause → arc back to centre → hover still for dwell → leave.
 */
export default async function capture(page, { W, H, cfg, wait }) {
  // The outer wrapper has aspect-square; locate it via its class fragment
  const card = page.locator(".aspect-square").first();

  let box;
  try {
    await card.waitFor({ state: "visible", timeout: 8000 });
    box = await card.boundingBox();
  } catch {
    box = { x: W * 0.25, y: H * 0.1, width: W * 0.5, height: H * 0.8 };
  }

  const { x, y, width, height } = box;
  const cx = x + width / 2;
  const cy = y + height / 2;

  await wait(500);

  // Helper: move mouse along a sequence of waypoints
  async function moveTo(tx, ty, durationMs) {
    try {
      const startX = (await page.mouse.move(tx, ty), tx);
      void startX;
      await wait(durationMs);
    } catch {
      // continue
    }
  }

  // Enter at top-left quadrant
  try {
    await page.mouse.move(x + width * 0.2, y + height * 0.2);
    await wait(200);
  } catch { /* continue */ }

  // Slow sweep: top-left → bottom-right (diagonal)
  const diagSteps = 35;
  try {
    for (let i = 0; i <= diagSteps; i++) {
      const t = i / diagSteps;
      const mx = x + width * (0.2 + 0.6 * t);
      const my = y + height * (0.2 + 0.6 * t);
      await page.mouse.move(mx, my);
      await wait(25);
    }
    await wait(350);
  } catch { /* continue */ }

  // Arc back: bottom-right → top-right
  try {
    const arcSteps = 20;
    for (let i = 0; i <= arcSteps; i++) {
      const t = i / arcSteps;
      const mx = x + width * (0.8 - 0.0 * t);
      const my = y + height * (0.8 - 0.6 * t);
      await page.mouse.move(mx, my);
      await wait(28);
    }
    await wait(300);
  } catch { /* continue */ }

  // Dwell at centre — spotlight fully illuminated
  try {
    await page.mouse.move(cx, cy);
    await wait(600);
  } catch { /* continue */ }

  // Leave — opacity returns to 0 (resting state)
  try {
    await page.mouse.move(x - 60, cy);
    await wait(400);
  } catch { /* continue */ }
}
