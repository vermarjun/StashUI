/**
 * Choreography: letter-pullup
 * Behavior: On mount, each letter animates from y:100/opacity:0 → y:0/opacity:1
 *           with a per-letter stagger (delay 0.05 s per letter). Two instances:
 *           "Hello World" and "Pull Up Letters". Longest stagger: 15 letters
 *           × 0.05 s = 0.75 s + animation duration ~0.3 s ≈ ~1 s total.
 *           Animation fires once on mount (no replay trigger on scroll since
 *           framer-motion `animate` is not IntersectionObserver-gated here).
 * Strategy: dwell ~2.5 s to fully show both instances landing in place, then do
 *           a tiny scroll down and back to replay the mount animation.
 */
export default async function capture(page, { W, H, cfg, wait }) {
  // Park mouse at center — no hover effects
  try {
    await page.mouse.move(W * 0.5, H * 0.5, { steps: 8 });
  } catch (_) {}

  // Dwell for the pull-up to complete on both rows
  try {
    await wait(2500);
  } catch (_) {}

  // Scroll down slightly to push letters out of view, then snap back
  // so the animation fires again for a clean loop
  try {
    await page.mouse.wheel(0, 500);
    await wait(200);
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
    await wait(1800); // let letters pull up again
  } catch (_) {}

  // Return to center for loop seam
  try {
    await page.mouse.move(W * 0.5, H * 0.5, { steps: 8 });
    await wait(200);
  } catch (_) {}
}
