// animated-grid-pattern: random grid squares fade in/out via motion/react.
// Each square takes ~4 s (duration) + 0.5 s (repeatDelay); staggered by index.
// Wait for ResizeObserver → dimensions → initial square generation, then dwell
// to catch the fade-in wave settling across the grid.
export default async function capture(page, { W, H, wait }) {
  // Wait for ResizeObserver + initial square placement
  try { await wait(600); } catch (_) {}

  // Park mouse at centre — component is pointer-events:none
  try {
    await page.mouse.move(Math.round(W * 0.5), Math.round(H * 0.5), { steps: 6 });
  } catch (_) {}

  // Dwell ~4 s so the first wave of square fade-ins completes
  try { await wait(4000); } catch (_) {}

  // Slight drift to confirm live animation
  try {
    await page.mouse.move(Math.round(W * 0.52), Math.round(H * 0.48), { steps: 10 });
  } catch (_) {}

  try { await wait(800); } catch (_) {}

  // Return to start for loop seam
  try {
    await page.mouse.move(Math.round(W * 0.5), Math.round(H * 0.5), { steps: 8 });
  } catch (_) {}

  try { await wait(400); } catch (_) {}
}
