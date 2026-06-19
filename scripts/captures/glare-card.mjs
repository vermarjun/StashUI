/**
 * Capture choreography for glare-card (GlareCard).
 *
 * Effect: pointer position drives CSS custom properties (--r-x, --r-y,
 * --m-x, --m-y, --bg-x, --bg-y) which produce a holographic foil rainbow
 * + radial glare highlight and 3D tilt via rotateY/rotateX.
 * Strategy: enter → slow sweep top-left to bottom-right (diagonal — shows
 * both tilt axes and rainbow shift) → arc back through centre → sweep to
 * top-right corner → dwell → leave (resets to flat/no-glare resting state).
 */
export default async function capture(page, { W, H, cfg, wait }) {
  // GlareCard has [aspect-ratio:17/21] and w-[320px]
  let box;
  try {
    const card = page.locator("[style*='aspect-ratio']").first();
    await card.waitFor({ state: "visible", timeout: 8000 });
    box = await card.boundingBox();
  } catch {
    // Estimate: centred card ~320×395 px
    box = {
      x: W / 2 - 160,
      y: H / 2 - 198,
      width: 320,
      height: 395,
    };
  }

  const { x, y, width, height } = box;
  const cx = x + width / 2;
  const cy = y + height / 2;

  await wait(400);

  // Enter at top-left — triggers pointerenter (sets --duration to 0s after 300ms)
  try {
    await page.mouse.move(x + width * 0.1, y + height * 0.1);
    await wait(350); // allow --duration to drop to 0s
  } catch { /* continue */ }

  // Diagonal sweep: top-left → bottom-right (maximum tilt + rainbow travel)
  const sweep1Steps = 40;
  try {
    for (let i = 0; i <= sweep1Steps; i++) {
      const t = i / sweep1Steps;
      await page.mouse.move(
        x + width  * (0.1 + 0.8 * t),
        y + height * (0.1 + 0.8 * t)
      );
      await wait(22);
    }
    await wait(350);
  } catch { /* continue */ }

  // Arc back to centre
  const arc1Steps = 20;
  try {
    for (let i = 0; i <= arc1Steps; i++) {
      const t = i / arc1Steps;
      await page.mouse.move(
        x + width  * (0.9 - 0.4 * t),
        y + height * (0.9 - 0.4 * t)
      );
      await wait(25);
    }
    await wait(250);
  } catch { /* continue */ }

  // Sweep to top-right (shows the opposite tilt direction)
  const sweep2Steps = 25;
  try {
    for (let i = 0; i <= sweep2Steps; i++) {
      const t = i / sweep2Steps;
      await page.mouse.move(
        cx + (x + width * 0.9 - cx) * t,
        cy + (y + height * 0.1 - cy) * t
      );
      await wait(22);
    }
    await wait(400);
  } catch { /* continue */ }

  // Leave card — --r-x and --r-y reset to 0deg (resting flat state)
  try {
    await page.mouse.move(x - 80, cy);
    await wait(450);
  } catch { /* continue */ }
}
