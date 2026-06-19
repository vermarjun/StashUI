/**
 * Choreography: Shuffle-TS-TW
 * Behavior: chars shuffle into place on mount (ScrollTrigger onEnter once).
 * After settling, a mouseenter re-triggers the shuffle animation (triggerOnHover).
 * Strategy: dwell through the initial animation, then hover the text to replay.
 */
export default async function capture(page, { W, H, wait }) {
  const cx = Math.round(W / 2);
  const cy = Math.round(H / 2);

  // Allow fonts + GSAP to initialise
  try {
    await wait(600);
  } catch (_) {}

  // Keep mouse well away during the initial shuffle-in
  try {
    await page.mouse.move(Math.round(W * 0.88), Math.round(H * 0.1));
  } catch (_) {}

  // Watch the initial shuffle animation (evenodd mode, ~0.35s per group + stagger)
  try {
    await wait(1800);
  } catch (_) {}

  // Hover the text element to re-arm + replay the shuffle
  try {
    await page.mouse.move(cx, cy, { steps: 12 });
    await wait(300);
    // Move away to trigger mouseenter freshly
    await page.mouse.move(Math.round(W * 0.88), Math.round(H * 0.9), { steps: 8 });
    await wait(200);
    await page.mouse.move(cx, cy, { steps: 10 });
  } catch (_) {}

  // Dwell through the replay
  try {
    await wait(1800);
  } catch (_) {}

  // Return mouse to corner for a clean loop seam
  try {
    await page.mouse.move(Math.round(W * 0.88), Math.round(H * 0.1), { steps: 10 });
    await wait(300);
  } catch (_) {}
}
