// warp-background: perspective 3D grid planes on all four sides with
// coloured beams travelling upward. Self-animating (motion/react Infinity loops).
// Dwell ~4 s to catch at least one full beam cycle on each side.
export default async function capture(page, { W, H, wait }) {
  // Settle: React hydration + motion/react beam timers start (beamDelayMax 3 s)
  try { await wait(800); } catch (_) {}

  // Park mouse at centre of the card content
  try {
    await page.mouse.move(Math.round(W * 0.5), Math.round(H * 0.5), { steps: 8 });
  } catch (_) {}

  // Dwell to catch beams from top/bottom/left/right sides
  try { await wait(3500); } catch (_) {}

  // Slight drift to show the card is live
  try {
    await page.mouse.move(Math.round(W * 0.52), Math.round(H * 0.49), { steps: 10 });
  } catch (_) {}

  try { await wait(800); } catch (_) {}

  // Return to start for loop seam
  try {
    await page.mouse.move(Math.round(W * 0.5), Math.round(H * 0.5), { steps: 8 });
  } catch (_) {}

  try { await wait(400); } catch (_) {}
}
