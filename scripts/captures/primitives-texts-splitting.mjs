/**
 * Choreography: primitives-texts-splitting
 * Behavior: chars/words/lines animate in from x:150→0 + opacity:0→1 with
 * per-element stagger (0.05s chars, 0.2s words, 0.3s lines). All three
 * SplittingText instances have inView=true so they fire on mount.
 * Total animation: chars line ~30×0.05+0.7=2.2s; words ~4×0.2+0.7=1.5s;
 * lines (delay=400ms) ~3×0.3+0.7+0.4=2.0s. Dwell ~3s covers all three.
 * Scroll-retrigger: scroll slightly down then back to re-trigger inViewOnce.
 */
export default async function capture(page, { W, H, wait }) {
  // Park mouse at neutral position.
  try {
    await page.mouse.move(Math.round(W * 0.05), Math.round(H * 0.1), { steps: 4 });
  } catch (_) {}

  // Short settle — animations fire on mount.
  try {
    await wait(300);
  } catch (_) {}

  // Dwell through the full stagger cascade for all three text blocks.
  try {
    await wait(3000);
  } catch (_) {}

  // Hold on the fully revealed text.
  try {
    await wait(600);
  } catch (_) {}

  // Scroll down slightly to push the component out of view (retrigger for loop).
  try {
    await page.mouse.wheel(0, 400);
    await wait(300);
  } catch (_) {}

  // Scroll back up — on next loop the inView fires again.
  try {
    await page.mouse.wheel(0, -400);
    await wait(200);
  } catch (_) {}
}
