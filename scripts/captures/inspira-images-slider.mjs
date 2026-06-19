/**
 * Capture choreography: inspira-images-slider (inspira-react)
 * Source file: registry/inspira-react/images-slider.tsx
 *
 * A full-bleed image slider (h-[400px]) that auto-advances every 4 s with a
 * vertical CSS slide transition (300 ms ease-in-out).  There are no visible
 * prev/next buttons — the component responds to keyboard ArrowDown/ArrowUp when
 * the slider div has focus (tabIndex=0), and to touch swipes.
 *
 * The demo uses `autoplay={4000}` and `direction="vertical"`.  An overlay
 * child (motion.div) shows "Beautiful Landscapes" + current slide counter.
 *
 * Strategy:
 *   1. Wait for images to preload (`Promise.all`) and the slider to appear.
 *   2. Click the slider to focus it, then advance manually with ArrowDown twice.
 *   3. Dwell after each advance to show the slide transition complete.
 *   4. Let autoplay fire once naturally, dwell — ends partway through slide 4.
 */
export default async function capture(page, { W, H, wait }) {
  // Wait for the slider container to be visible
  try {
    await page.locator(".overflow-hidden.rounded-2xl").first().waitFor({
      state: "visible",
      timeout: 10000,
    });
  } catch {
    await wait(2500);
  }

  // Wait for images to preload and overlay to become visible (~100 ms delay after load)
  await wait(1500);

  // Click slider to focus it (required for keyboard events)
  try {
    await page.mouse.click(W * 0.5, H * 0.5);
  } catch (_) {}

  // Advance to slide 2 via ArrowDown
  try {
    await page.keyboard.press("ArrowDown");
  } catch (_) {}
  await wait(1400);

  // Advance to slide 3
  try {
    await page.keyboard.press("ArrowDown");
  } catch (_) {}
  await wait(1400);

  // Let autoplay fire the next advance (~4 s from last interaction)
  await wait(3800);

  // Final dwell on slide 4
  await wait(600);
}
