/**
 * Choreography: ShinyText-TS-TW
 * Behavior: a shine gradient sweeps left-to-right across the text continuously
 * (speed=2 → 2s per cycle). Pure auto-play — no cursor interaction required.
 * Dwell 3s to show ~1.5 full shine sweeps clearly.
 */
export default async function capture(page, { W, H, wait }) {
  const cx = Math.round(W / 2);

  // Allow motion/react + rAF loop to initialise
  try {
    await wait(400);
  } catch (_) {}

  // Park cursor far from the text (pauseOnHover is false by default, but safe)
  try {
    await page.mouse.move(cx, Math.round(H * 0.88));
  } catch (_) {}

  // Watch 1.5 shine cycles: 2s × 1.5 = 3s
  try {
    await wait(3000);
  } catch (_) {}

  // Return to bottom-centre for clean loop seam
  try {
    await page.mouse.move(cx, Math.round(H * 0.88));
    await wait(200);
  } catch (_) {}
}
