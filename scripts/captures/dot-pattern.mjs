// dot-pattern: SVG dots sized by ResizeObserver; static (glow=false default).
// Settle for ResizeObserver to fire and dots to paint, then dwell.
export default async function capture(page, { W, H, wait }) {
  // Wait for ResizeObserver → dimensions → dot render
  try { await wait(600); } catch (_) {}

  // Park mouse at centre
  try {
    await page.mouse.move(Math.round(W * 0.5), Math.round(H * 0.5), { steps: 6 });
  } catch (_) {}

  // Dwell to show the full dot field
  try { await wait(3200); } catch (_) {}

  // Slight drift and return for loop seam
  try {
    await page.mouse.move(Math.round(W * 0.52), Math.round(H * 0.48), { steps: 10 });
  } catch (_) {}

  try { await wait(600); } catch (_) {}

  try {
    await page.mouse.move(Math.round(W * 0.5), Math.round(H * 0.5), { steps: 8 });
  } catch (_) {}

  try { await wait(400); } catch (_) {}
}
