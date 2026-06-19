/**
 * Capture choreography: feature-carousel (cult-ui)
 *
 * A 4-step feature showcase card that auto-advances every 3 s.  The entire
 * card surface is a click target (z-50 motion.div) that fires `handleIncrement`
 * — advancing the step manually also resets the 3 s timer.  Below the card a
 * `Steps` nav shows which step is active.
 *
 * Strategy:
 *   1. Wait for the FeatureCard to mount and first step image to animate in.
 *   2. Dwell on step 0 (two slide-in images).
 *   3. Click the card to advance to step 1, dwell.
 *   4. Click to advance to step 2, dwell.
 *   5. Click to advance to step 3, dwell — end after seeing all four steps.
 */
export default async function capture(page, { W, H, wait }) {
  // Wait for the dark gradient card to appear
  try {
    await page.locator(".from-neutral-900\\/90").first().waitFor({
      state: "visible",
      timeout: 10000,
    });
  } catch {
    await wait(2500);
  }

  // Let step 0 images animate in (spring stiffness 300, ~0.5 s)
  await wait(1000);

  // Centre of the card click-target layer
  const cx = W * 0.5;
  const cy = H * 0.5;

  // Advance to step 1
  try {
    await page.mouse.click(cx, cy);
  } catch (_) {}
  await wait(1200);

  // Advance to step 2
  try {
    await page.mouse.click(cx, cy);
  } catch (_) {}
  await wait(1200);

  // Advance to step 3
  try {
    await page.mouse.click(cx, cy);
  } catch (_) {}
  await wait(1200);

  // Let the step 3 animation (fadeInScale) complete
  await wait(500);
}
