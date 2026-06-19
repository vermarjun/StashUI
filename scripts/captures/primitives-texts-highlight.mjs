/**
 * Choreography: primitives-texts-highlight
 * Behavior: each HighlightText expands backgroundSize from 0%→100% (inView,
 * duration=2s). The demo has two highlighted spans inside a paragraph. Both
 * fire on mount since inView=true. After the expand animation, there is
 * nothing to hover — just dwell to show the reveal happening.
 */
export default async function capture(page, { W, H, wait }) {
  // Park mouse in a neutral area away from text.
  try {
    await page.mouse.move(Math.round(W * 0.05), Math.round(H * 0.15), { steps: 5 });
  } catch (_) {}

  // Brief settle for mount.
  try {
    await wait(300);
  } catch (_) {}

  // The first highlight animates over 2s (delay=0), the second adds 600ms
  // delay (0.6s) + another 2s = ~2.6s total. Dwell 3s to see both complete.
  try {
    await wait(3000);
  } catch (_) {}

  // Move mouse across the paragraph so the highlighted words are in frame.
  try {
    await page.mouse.move(Math.round(W * 0.3), Math.round(H * 0.5), { steps: 10 });
    await wait(300);
    await page.mouse.move(Math.round(W * 0.7), Math.round(H * 0.5), { steps: 15 });
    await wait(300);
    await page.mouse.move(Math.round(W * 0.3), Math.round(H * 0.5), { steps: 10 });
    await wait(300);
  } catch (_) {}

  // Return near top for loop cut.
  try {
    await page.mouse.move(Math.round(W * 0.05), Math.round(H * 0.15), { steps: 6 });
    await wait(200);
  } catch (_) {}
}
