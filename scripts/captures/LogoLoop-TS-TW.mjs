/**
 * Capture choreography for LogoLoop-TS-TW
 *
 * LogoLoop is a horizontally scrolling marquee of SVG/img logos that moves
 * continuously via RAF. Strategy: settle ~800ms for images to load, then dwell
 * ~3.5s so several full logo passes are visible. Hover briefly mid-strip to
 * show the pauseOnHover behaviour (speed slows/stops), then retreat so the
 * loop seam is clean.
 */
export default async function capture(page, { W, H, wait }) {
  // Wait for images to load and the animation loop to start
  try { await wait(800); } catch (_) {}

  // Dwell while logos scroll past — captures the continuous marquee motion
  try { await wait(2000); } catch (_) {}

  // Move mouse onto the logo strip to show pauseOnHover slowdown
  try {
    await page.mouse.move(Math.round(W * 0.5), Math.round(H * 0.5), { steps: 10 });
    await wait(900);
  } catch (_) {}

  // Retreat mouse off-strip so the scroll restores to full speed before loop
  try {
    await page.mouse.move(Math.round(W * 0.5), Math.round(H * 0.12), { steps: 10 });
    await wait(600);
  } catch (_) {}
}
