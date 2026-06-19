/**
 * Choreography: particles-bg
 * Canvas-based particle system, mouse-reactive (magnetise toward cursor).
 * Settle ~1 s for initial particle scatter, drift mouse to pull particles
 * into visible clusters, then dwell.
 */
export default async function choreograph({ page, W, H }) {
  // Settle: particles initialise at random positions
  await new Promise((r) => setTimeout(r, 1000));

  // Move mouse to centre to start attracting particles
  try {
    await page.mouse.move(W / 2, H / 2);
    await new Promise((r) => setTimeout(r, 600));
  } catch (e) {
    console.warn("initial move failed", e.message);
  }

  // Slow drift in a wide arc — particles trail behind
  try {
    await page.mouse.move(W * 0.25, H * 0.35, { steps: 35 });
    await new Promise((r) => setTimeout(r, 500));
    await page.mouse.move(W * 0.75, H * 0.35, { steps: 50 });
    await new Promise((r) => setTimeout(r, 500));
    await page.mouse.move(W * 0.75, H * 0.65, { steps: 30 });
    await new Promise((r) => setTimeout(r, 500));
    await page.mouse.move(W * 0.5, H * 0.5, { steps: 25 });
  } catch (e) {
    console.warn("drift arc failed", e.message);
  }

  // Dwell — particles converging toward centre cursor position
  await new Promise((r) => setTimeout(r, 3000));
}
