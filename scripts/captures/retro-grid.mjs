// retro-grid: WebGL perspective grid scrolling toward the viewer (15 s/cycle).
// Wait ~2 s for WebGL shader compile + first frame, then dwell.
export default async function capture(page, { W, H, wait }) {
  // Settle: WebGL context creation → shader compile → first draw → setIsWebGlReady
  try { await wait(2000); } catch (_) {}

  // Park mouse at centre — component is pointer-events:none
  try {
    await page.mouse.move(Math.round(W * 0.5), Math.round(H * 0.5), { steps: 6 });
  } catch (_) {}

  // Dwell to show the scrolling perspective grid lines
  try { await wait(2800); } catch (_) {}

  // Slight drift and return for loop seam
  try {
    await page.mouse.move(Math.round(W * 0.51), Math.round(H * 0.49), { steps: 8 });
  } catch (_) {}

  try { await wait(600); } catch (_) {}

  try {
    await page.mouse.move(Math.round(W * 0.5), Math.round(H * 0.5), { steps: 6 });
  } catch (_) {}

  try { await wait(400); } catch (_) {}
}
