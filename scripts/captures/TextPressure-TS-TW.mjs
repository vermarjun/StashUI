/**
 * Choreography: TextPressure-TS-TW
 * Behavior: variable-font weight/width/italic follows the mouse via a rAF loop.
 * Closest chars get max wght/wdth, chars further away collapse to minimum.
 * Moving the cursor slowly across the full title text makes the pressure wave
 * travel letter-by-letter.
 */
export default async function capture(page, { W, H, wait }) {
  // Text is a full-bleed h1 centred vertically; baseline ~H/2
  const cy = Math.round(H / 2);
  const startX = Math.round(W * 0.06);
  const endX = Math.round(W * 0.94);

  // Allow rAF loop + font-face to load
  try {
    await wait(700);
  } catch (_) {}

  // Enter from well left of the text
  try {
    await page.mouse.move(startX, cy);
    await wait(200);
  } catch (_) {}

  // Slow sweep right: 70 steps × 35ms = 2.45 s — slow enough for the lerp
  // (mouse lags cursor at /15 factor) to visibly track each character
  try {
    const steps = 70;
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const x = Math.round(startX + (endX - startX) * t);
      // Slight vertical oscillation keeps the effect visible on taller fonts
      const y = Math.round(cy + Math.sin(t * Math.PI * 2) * 18);
      await page.mouse.move(x, y);
      await wait(35);
    }
  } catch (_) {}

  // Dwell so the last chars finish animating before the return sweep
  try {
    await wait(500);
  } catch (_) {}

  // Return sweep left (faster — end near where we started)
  try {
    const returnSteps = 30;
    for (let i = 0; i <= returnSteps; i++) {
      const t = i / returnSteps;
      const x = Math.round(endX - (endX - startX) * t);
      const y = Math.round(cy - Math.sin(t * Math.PI) * 12);
      await page.mouse.move(x, y);
      await wait(28);
    }
  } catch (_) {}

  try {
    await wait(400);
  } catch (_) {}
}
