/**
 * Capture choreography for bg-animated-gradient (GradientAnimation).
 *
 * GradientAnimation uses motion/react to animate multiple radial gradients in
 * an infinite reverse loop. The effect is purely CSS/JS-driven — no pointer
 * interaction. Strategy: settle, then dwell long enough for the gradient
 * transition to advance noticeably (animationDuration=4 s so one full cycle is
 * 4 s; dwell ~3.5 s to capture roughly half a cycle).
 */
export default async function capture(page, { W, H, wait }) {
  // Park mouse off-content so it doesn't obscure anything.
  try {
    await page.mouse.move(Math.round(W * 0.05), Math.round(H * 0.05), { steps: 4 });
  } catch (_) {}

  // Settle: let the gradient animation initialise and advance.
  try {
    await wait(3500);
  } catch (_) {}

  // Brief move to centre — the text is centred; confirm layout is correct.
  try {
    await page.mouse.move(Math.round(W / 2), Math.round(H / 2), { steps: 12 });
    await wait(500);
  } catch (_) {}

  // Move away and dwell for the final frame.
  try {
    await page.mouse.move(Math.round(W * 0.9), Math.round(H * 0.1), { steps: 10 });
    await wait(1000);
  } catch (_) {}
}
