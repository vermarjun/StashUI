/**
 * Choreography: primitives-texts-gradient
 * Behavior: motion/react animates backgroundPosition from 0%→500% over 50s
 * (default transition), creating a slowly sweeping color gradient. Auto-play,
 * no pointer interaction needed. Dwell ~3s to capture mid-sweep movement.
 */
export default async function capture(page, { W, H, wait }) {
  // Park mouse at a neutral corner so it doesn't affect the render.
  try {
    await page.mouse.move(Math.round(W * 0.05), Math.round(H * 0.05), { steps: 5 });
  } catch (_) {}

  // Brief settle for mount + animation kickoff.
  try {
    await wait(400);
  } catch (_) {}

  // Dwell ~3s — the gradient position advances noticeably even in the slow
  // 50s cycle, giving a clear sense of the color sweep animation.
  try {
    await wait(3000);
  } catch (_) {}

  // Return mouse near start for a clean loop cut point.
  try {
    await page.mouse.move(Math.round(W * 0.05), Math.round(H * 0.05), { steps: 4 });
    await wait(200);
  } catch (_) {}
}
