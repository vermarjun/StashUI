/**
 * Choreography: inspira-dither-shader
 * Behavior: WebGL canvas dithers an image. Controls allow switching dither mode
 *           (bayer/halftone/noise/crosshatch) and color mode (grayscale/duotone/
 *           original/custom). Settle ~2 s then click through a few modes to show
 *           variety. May be blank in headless — orchestrator falls back.
 */
export default async function choreography(page, { W, H }) {
  // Settle for ~2 s to let WebGL context and image load.
  try {
    await page.mouse.move(W / 2, H / 2 - 80, { steps: 10 });
    await page.waitForTimeout(2000);
  } catch (_) {}

  // --- Dither mode buttons (row 1 of controls) ---
  // Controls are centred below the 400 px tall canvas.
  // Canvas top ≈ (H - 400 - 80) / 2; button row ≈ canvas bottom + 24 px gap.
  const canvasTopApprox = (H - 480) / 2;
  const controlsY = canvasTopApprox + 400 + 48; // canvas height + gap + button height/2

  // Dither buttons: bayer | halftone | noise | crosshatch — approx equally spaced
  // within ~4 * 80 px = 320 px centred at W/2.
  const ditherBtns = [
    { label: "halftone",   x: W / 2 - 80 },
    { label: "noise",      x: W / 2      },
    { label: "crosshatch", x: W / 2 + 90 },
  ];

  for (const { label, x } of ditherBtns) {
    try {
      await page.mouse.move(x, controlsY, { steps: 15 });
      await page.waitForTimeout(200);
      await page.mouse.click(x, controlsY);
      await page.waitForTimeout(900); // let shader recompile / re-render
    } catch (_) {}
  }

  // --- Color mode buttons (row 2) ---
  const colorRowY = controlsY + 44;
  const colorBtns = [
    { label: "duotone",  x: W / 2 - 70 },
    { label: "original", x: W / 2 + 10 },
  ];

  for (const { label, x } of colorBtns) {
    try {
      await page.mouse.move(x, colorRowY, { steps: 15 });
      await page.waitForTimeout(200);
      await page.mouse.click(x, colorRowY);
      await page.waitForTimeout(900);
    } catch (_) {}
  }

  // Drift mouse gently over the canvas to confirm WebGL renders.
  try {
    await page.mouse.move(W / 2 - 100, canvasTopApprox + 200, { steps: 20 });
    await page.waitForTimeout(500);
    await page.mouse.move(W / 2 + 100, canvasTopApprox + 200, { steps: 20 });
    await page.waitForTimeout(500);
  } catch (_) {}

  // Return near start
  try {
    await page.mouse.move(W / 2, H / 2, { steps: 15 });
  } catch (_) {}
}
