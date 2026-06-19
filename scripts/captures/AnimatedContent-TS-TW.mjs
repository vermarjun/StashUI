/**
 * Capture choreography for AnimatedContent-TS-TW
 *
 * AnimatedContent is a scroll-triggered GSAP wrapper: children slide in from
 * an offset (default vertical, 100px below) and fade up when the trigger
 * enters the viewport. The demo renders the component directly with no
 * children supplied, so we need to let the ScrollTrigger fire on mount
 * (threshold 0.1 → `top 90%` start) and then dwell to show the settled state.
 *
 * Strategy:
 *   1. Allow mount + ScrollTrigger settle (no scroll needed — component is
 *      already in view at load).
 *   2. Dwell so the 0.8 s ease-out animation completes visibly.
 *   3. Return mouse to neutral centre so the loop seam is clean.
 */
export default async function capture(page, { W, H, wait }) {
  // Mount settle — give GSAP time to register the plugin and fire onEnter
  try {
    await wait(300);
  } catch (_) {}

  // Move mouse gently to centre so any hover-dependent children are activated
  try {
    await page.mouse.move(W / 2, H / 2, { steps: 12 });
  } catch (_) {}

  // Wait for the full slide-in animation (0.8 s default duration + buffer)
  try {
    await wait(1200);
  } catch (_) {}

  // Dwell at centre so the settled state is clearly visible in the GIF
  try {
    await wait(800);
  } catch (_) {}

  // Return to top-centre so the loop seam is tidy
  try {
    await page.mouse.move(W / 2, H * 0.1, { steps: 14 });
    await wait(300);
  } catch (_) {}
}
