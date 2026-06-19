/**
 * Choreography: inspira-vortex
 * Behavior: Canvas-based simplex-noise particle vortex (700 particles by
 *           default). Canvas is sized to window.innerWidth/Height on mount.
 *           Particles need ~1.5–2 s to spread into the vortex shape; settle
 *           ~2 s then dwell ~3 s. The motion/react fade-in takes ~0.3 s.
 *           No mouse interaction (mouseMode is not applicable here).
 */
export default async function choreography(page, { W, H }) {
  // Center the cursor while the canvas initialises and particles spread.
  try {
    await page.mouse.move(W / 2, H / 2, { steps: 8 });
  } catch (_) {}

  // Settle: canvas setup + particle init + motion/react fade-in + vortex form.
  try {
    await page.waitForTimeout(2000);
  } catch (_) {}

  // Dwell so the colorful vortex streams are captured at full intensity.
  try {
    await page.waitForTimeout(3000);
  } catch (_) {}

  // Gentle orbit to show particles wrap around the center.
  try {
    await page.mouse.move(W * 0.35, H * 0.4, { steps: 20 });
    await page.waitForTimeout(400);
    await page.mouse.move(W * 0.65, H * 0.6, { steps: 20 });
    await page.waitForTimeout(400);
    await page.mouse.move(W / 2, H / 2, { steps: 14 });
    await page.waitForTimeout(800);
  } catch (_) {}
}
