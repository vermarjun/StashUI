/**
 * Capture choreography for particle-image.
 *
 * Effect: `inspira-image-particles` renders a 300×200 canvas where the image
 * is reconstructed from individual particles. Particles initialise from random
 * positions and settle into place (gravity 0.08, initPosition "random"). Moving
 * the mouse within the canvas repels particles (mouseForce 30).
 *
 * Strategy:
 *   1. Settle ~1.5 s — dynamic import resolves, InspiraImageParticle mounts,
 *      particles converge to their image positions.
 *   2. Enter the canvas from the left and sweep slowly across — particles
 *      scatter outward from the cursor.
 *   3. Hold briefly in the centre, then sweep to the right.
 *   4. Exit the canvas and dwell ~800 ms — particles spring back into image
 *      shape (shows the restoration).
 *   5. One more short pass across the canvas.
 *   6. Return to canvas centre for loop seam.
 */
export default async function capture(page, { W, H, wait }) {
  // Canvas is 300×200 centred inside a flex column; estimate bounds.
  const cvW = 300;
  const cvH = 200;
  const cvLeft  = Math.round((W - cvW) / 2);
  const cvTop   = Math.round((H - cvH) / 2 + 20); // slight downward bias (label above)
  const cvRight = cvLeft + cvW;
  const cvBot   = cvTop + cvH;
  const cx = Math.round((cvLeft + cvRight) / 2);
  const cy = Math.round((cvTop + cvBot) / 2);

  // Settle — dynamic import + particle convergence
  try { await wait(1500); } catch (_) {}

  // Enter canvas left-centre
  try {
    await page.mouse.move(cvLeft + 15, cy, { steps: 8 });
    await wait(300);
  } catch (_) {}

  // Slow sweep across canvas (particles scatter)
  try {
    await page.mouse.move(cvRight - 15, cy, { steps: 55 });
    await wait(600);
  } catch (_) {}

  // Exit canvas right — particles spring back
  try {
    await page.mouse.move(cvRight + 60, cy, { steps: 10 });
    await wait(800);
  } catch (_) {}

  // Second pass: top-left diagonal to bottom-right
  try {
    await page.mouse.move(cvLeft + 20, cvTop + 20, { steps: 12 });
    await wait(200);
    await page.mouse.move(cvRight - 20, cvBot - 20, { steps: 50 });
    await wait(500);
  } catch (_) {}

  // Exit and let particles settle again
  try {
    await page.mouse.move(cx, cvBot + 60, { steps: 10 });
    await wait(700);
  } catch (_) {}

  // Return to canvas centre
  try {
    await page.mouse.move(cx, cy, { steps: 18 });
    await wait(500);
  } catch (_) {}
}
