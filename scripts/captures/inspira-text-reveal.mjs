/**
 * Capture choreography for inspira-text-reveal
 * (source: text-reveal.tsx).
 *
 * Behaviour: words slide up from below their overflow:hidden container,
 * triggered by `useInView` with `once:true` and a -80 px bottom margin.
 * The demo shows two staggered paragraphs. Because align=top and scroll=true,
 * the preview runner starts scrolled to the top — the component may already
 * be in view on load (no deep scroll needed), but scrolling down a modest
 * amount ensures the in-view callback fires reliably.
 * Strategy:
 *   1. Ensure we are at the top.
 *   2. Wait for mount (~300 ms).
 *   3. Scroll down gently so the text block enters the viewport and useInView
 *      fires (the -80 px margin means it triggers slightly before the element
 *      is fully visible).
 *   4. Dwell to let both stagger sequences complete (~1.5 s for longest word).
 *   5. Scroll back to the top.
 */
export default async function capture(page, { W, H, wait }) {
  // Ensure we start at the very top.
  try {
    await page.evaluate(() => window.scrollTo(0, 0));
  } catch (_) {}

  try {
    await wait(300);
  } catch (_) {}

  // Scroll down a moderate amount so the text block enters the viewport.
  // The demo is a flex-col justify-center at min-h-[300px] — one viewport
  // scroll of ~30 % H is enough to guarantee the -80 px margin fires.
  try {
    const steps = 10;
    const totalScroll = Math.round(H * 0.35);
    const stepSize = totalScroll / steps;
    for (let i = 0; i < steps; i++) {
      await page.mouse.wheel(0, stepSize);
      await wait(60);
    }
  } catch (_) {}

  // Dwell to let both stagger animations complete.
  // Longest: delay=0.4 + (9 words × 0.06) + 0.6 s transition ≈ 1.5 s.
  try {
    await wait(2000);
  } catch (_) {}

  // Return to top for a clean loop seam.
  try {
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
  } catch (_) {}

  try {
    await wait(300);
  } catch (_) {}
}
