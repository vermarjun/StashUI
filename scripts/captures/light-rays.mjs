// light-rays: motion/react rays fade in/out with random durations (~9–19 s
// per ray) and delays up to 12 s (speed default). Initial createRays fires
// after mount via useEffect. Settle ~1.5 s so rays with short delays are
// already fading in, then dwell to catch multiple rays at peak opacity.
export default async function capture(page, { W, H, wait }) {
  // Settle: useEffect fires → rays created → motion/react opacity animations start
  try { await wait(1500); } catch (_) {}

  // Park mouse at centre — component is pointer-events:none
  try {
    await page.mouse.move(Math.round(W * 0.5), Math.round(H * 0.5), { steps: 6 });
  } catch (_) {}

  // Dwell ~3 s to capture rays sweeping across their peak opacity window
  try { await wait(3000); } catch (_) {}

  // Slight drift to show it is live
  try {
    await page.mouse.move(Math.round(W * 0.52), Math.round(H * 0.49), { steps: 10 });
  } catch (_) {}

  try { await wait(800); } catch (_) {}

  // Return near start for loop seam
  try {
    await page.mouse.move(Math.round(W * 0.5), Math.round(H * 0.5), { steps: 8 });
  } catch (_) {}

  try { await wait(400); } catch (_) {}
}
