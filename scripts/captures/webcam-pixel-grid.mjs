/**
 * Capture choreography for webcam-pixel-grid.
 *
 * Effect: requires live webcam access — headless capture will not have a
 * camera, so the component will display its "camera access needed" error UI.
 * The orchestrator is expected to fall back for this component. We author a
 * simple dwell choreography anyway so it runs cleanly if a camera is present.
 * Strategy:
 *   1. Settle ~1000 ms for camera initialisation attempt.
 *   2. If the error UI appeared, dwell briefly and end.
 *   3. If camera is live: slow drift across the canvas to show motion detection.
 */
export default async function capture(page, { W, H, wait }) {
  // Settle for camera init or error popup
  try { await wait(1000); } catch (_) {}

  // Attempt to dismiss the error popup if visible (click its close button)
  try {
    const closeBtn = page.locator("button[title='Camera access required']").first();
    const visible  = await closeBtn.isVisible({ timeout: 500 }).catch(() => false);
    if (!visible) {
      // Try the ✕ button inside the popup
      const x = page.locator("button.absolute.top-2.right-2").first();
      if (await x.isVisible({ timeout: 300 }).catch(() => false)) {
        await x.click();
      }
    } else {
      // Minimise icon — no‐op; we just dwell
    }
  } catch (_) {}

  // Short dwell so the resting state is visible
  try { await wait(1200); } catch (_) {}

  // Gentle pointer drift across the centre of the canvas
  try {
    await page.mouse.move(Math.round(W * 0.35), Math.round(H * 0.45), { steps: 12 });
    await wait(400);
    await page.mouse.move(Math.round(W * 0.65), Math.round(H * 0.55), { steps: 16 });
    await wait(400);
  } catch (_) {}

  // Return to centre for loop seam
  try {
    await page.mouse.move(Math.round(W * 0.5), Math.round(H * 0.5), { steps: 10 });
    await wait(400);
  } catch (_) {}
}
