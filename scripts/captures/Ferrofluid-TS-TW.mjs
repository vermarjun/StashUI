/**
 * Capture choreography for Ferrofluid-TS-TW
 *
 * Ferrofluid is a WebGL OGL shader that simulates ferrofluid ridge/peak
 * patterns using value-noise + smooth-min blending. mouseInteraction=true:
 * hovering creates a bright spot that suppresses the rim lighting locally.
 * The demo: colors=["#4F46E5","#06B6D4","#E0F2FE"], speed=0.5, scale=1.6,
 * turbulence=1, glow=2, flowDirection="down", bg black.
 *
 * Strategy:
 *   1. Settle ~2.5 s for OGL init and the fluid noise to produce visible peaks.
 *   2. Dwell ~1 s on the idle flowing ferrofluid ridges.
 *   3. Slow figure-eight path across the canvas — the mouse glow suppresses
 *      ridges locally, creating a dark "hole" that traces the path.
 *   4. Return to centre, dwell ~2 s for the glow to settle and fluid to flow.
 */
export default async function capture(page, { W, H, wait }) {
  try {
    const canvas = page.locator('canvas').first();
    await canvas.waitFor({ state: 'visible', timeout: 6000 });
  } catch (e) {
    console.warn('Ferrofluid: canvas not found', e.message);
  }

  // Fluid noise needs a couple of seconds to produce interesting ridge patterns
  try {
    await wait(2500);
  } catch (_) {}

  const cx = Math.round(W * 0.5);
  const cy = Math.round(H * 0.5);

  // Idle dwell
  try {
    await wait(1000);
  } catch (_) {}

  // Figure-eight: two overlapping horizontal ellipses
  try {
    const rx = Math.round(W * 0.25);
    const ry = Math.round(H * 0.2);
    // Left lobe
    for (let i = 0; i <= 20; i++) {
      const angle = (i / 20) * 2 * Math.PI;
      const px = Math.round(cx - rx * 0.5 + rx * 0.5 * Math.cos(angle));
      const py = Math.round(cy + ry * Math.sin(angle));
      await page.mouse.move(px, py, { steps: 3 });
      await wait(55);
    }
    // Right lobe
    for (let i = 0; i <= 20; i++) {
      const angle = (i / 20) * 2 * Math.PI;
      const px = Math.round(cx + rx * 0.5 + rx * 0.5 * Math.cos(angle));
      const py = Math.round(cy - ry * Math.sin(angle));
      await page.mouse.move(px, py, { steps: 3 });
      await wait(55);
    }
  } catch (e) {
    console.warn('Ferrofluid: figure-eight error', e.message);
  }

  // Return to centre, final dwell
  try {
    await page.mouse.move(cx, cy, { steps: 15 });
    await wait(2000);
  } catch (_) {}
}
