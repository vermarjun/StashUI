/**
 * Choreography: ScrambledText-TS-TW
 * Behavior: pointermove within the radius (100px) of each char triggers a
 * GSAP scramble animation. Moving the cursor slowly across the text gives each
 * char time to scramble and re-settle visibly.
 */
export default async function capture(page, { W, H, wait }) {
  const cy = Math.round(H / 2);
  const startX = Math.round(W * 0.08);
  const endX = Math.round(W * 0.92);

  // Allow the component to mount and SplitText to initialise
  try {
    await wait(500);
  } catch (_) {}

  // Enter from left edge at text baseline height
  try {
    await page.mouse.move(startX, cy);
    await wait(200);
  } catch (_) {}

  // Slow sweep right: 60 steps × 40ms = 2.4 s — wide enough that every char
  // is visited within radius and scrambles visibly
  try {
    const steps = 60;
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const x = Math.round(startX + (endX - startX) * t);
      // Gentle vertical sine drift so chars above and below centre are hit
      const y = Math.round(cy + Math.sin(t * Math.PI * 1.5) * 24);
      await page.mouse.move(x, y);
      await wait(40);
    }
  } catch (_) {}

  // Dwell after the sweep so the last chars finish scrambling back
  try {
    await wait(800);
  } catch (_) {}

  // Sweep back left (faster) to end near start position
  try {
    const returnSteps = 30;
    for (let i = 0; i <= returnSteps; i++) {
      const t = i / returnSteps;
      const x = Math.round(endX - (endX - startX) * t);
      const y = Math.round(cy - Math.sin(t * Math.PI) * 16);
      await page.mouse.move(x, y);
      await wait(30);
    }
  } catch (_) {}

  try {
    await wait(400);
  } catch (_) {}
}
