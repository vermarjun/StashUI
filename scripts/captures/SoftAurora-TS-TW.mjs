/**
 * Capture choreography for SoftAurora-TS-TW
 *
 * SoftAurora renders an OGL WebGL shader of aurora borealis bands. Colors cycle
 * between white and electric-purple (#e100ff). enableMouseInteraction=true with
 * mouseInfluence=0.25 means the cursor gently displaces the aurora bands
 * vertically, creating a breathing/ripple effect.
 *
 * Strategy:
 *   1. Settle ~2 s for OGL renderer + shader compile.
 *   2. Move cursor to canvas centre to seed the mouse uniform.
 *   3. Slow vertical drift: centre → upper-third then lower-third to show the
 *      aurora bands responding to vertical mouse movement.
 *   4. Dwell ~2.5 s at the lower position — bands breathe and colour-shift.
 *   5. Return to centre for loop seam.
 */
export default async function capture(page, { W, H, wait }) {
  const cx = Math.round(W / 2);
  const cy = Math.round(H / 2);

  // OGL + shader compile
  try {
    await wait(2000);
  } catch (_) {}

  // Seed at centre
  try {
    await page.mouse.move(cx, cy, { steps: 1 });
    await wait(300);
  } catch (_) {}

  // Drift upward — aurora bands shift down (inverse influence)
  try {
    await page.mouse.move(cx, Math.round(H * 0.25), { steps: 40 });
    await wait(700);
  } catch (_) {}

  // Drift downward — aurora bands shift up; colour change is apparent
  try {
    await page.mouse.move(cx, Math.round(H * 0.75), { steps: 60 });
    await wait(2500);
  } catch (_) {}

  // Gentle horizontal sweep to show lateral spread
  try {
    await page.mouse.move(Math.round(W * 0.3), Math.round(H * 0.6), { steps: 30 });
    await wait(400);
    await page.mouse.move(Math.round(W * 0.7), Math.round(H * 0.6), { steps: 40 });
    await wait(400);
  } catch (_) {}

  // Return to centre
  try {
    await page.mouse.move(cx, cy, { steps: 30 });
    await wait(400);
  } catch (_) {}
}
