/**
 * Capture choreography for FadeContent-TS-TW
 *
 * FadeContent is a GSAP + ScrollTrigger fade-in wrapper. It sets the element
 * to `autoAlpha: 0` on mount, then plays a fade-in timeline when the element
 * enters the scroller viewport (start: `top 90%`, `once: true`).
 * `duration` defaults to 1000 (treated as ms → 1 s) with `power2.out`.
 * Optional blur (default false) would also transition `filter`.
 *
 * The demo renders the component with no children — the bare wrapper fades in.
 * Since `once:true` and the element is visible immediately at load, the animation
 * fires immediately after mount. We just need to dwell long enough to capture it.
 *
 * Strategy:
 *   1. Short mount settle so GSAP registers and fires `onEnter`.
 *   2. Dwell to cover the full 1 s fade.
 *   3. Move mouse gently across so the settled state is clearly shown.
 *   4. Return to centre for a clean loop seam.
 */
export default async function capture(page, { W, H, wait }) {
  // Allow GSAP/ScrollTrigger to initialise and fire
  try {
    await wait(200);
  } catch (_) {}

  // Dwell for the fade animation (1 s default + buffer)
  try {
    await wait(1400);
  } catch (_) {}

  // Gentle mouse drift across the component to show the settled state
  try {
    await page.mouse.move(W * 0.3, H / 2, { steps: 10 });
    await wait(300);
    await page.mouse.move(W * 0.7, H / 2, { steps: 14 });
    await wait(300);
  } catch (_) {}

  // Return to centre
  try {
    await page.mouse.move(W / 2, H / 2, { steps: 10 });
    await wait(400);
  } catch (_) {}
}
