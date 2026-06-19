// flickering-grid: canvas animation; squares flicker opacity on every RAF.
// Wait for IntersectionObserver + canvas setup (~600 ms), then dwell.
export default async function capture(page, { W, H, wait }) {
  // Settle: IntersectionObserver fires → isInView = true → animation starts
  try { await wait(600); } catch (_) {}

  // Park mouse at centre (component is pointer-events:none, no interaction)
  try {
    await page.mouse.move(Math.round(W * 0.5), Math.round(H * 0.5), { steps: 6 });
  } catch (_) {}

  // Dwell ~3 s — let the flicker establish a visible rhythm
  try { await wait(3000); } catch (_) {}

  // Subtle drift (shows it is live)
  try {
    await page.mouse.move(Math.round(W * 0.52), Math.round(H * 0.48), { steps: 10 });
  } catch (_) {}

  try { await wait(1000); } catch (_) {}

  // Return to start for clean loop seam
  try {
    await page.mouse.move(Math.round(W * 0.5), Math.round(H * 0.5), { steps: 8 });
  } catch (_) {}

  try { await wait(400); } catch (_) {}
}
