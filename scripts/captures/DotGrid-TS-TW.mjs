/**
 * Capture choreography for DotGrid-TS-TW
 *
 * DotGrid is a canvas-2D GSAP InertiaPlugin dot grid. Moving the mouse fast
 * (above speedTrigger=100 px/s) pushes dots away with inertia. Clicking fires
 * a radial shockwave (shockRadius=250, shockStrength=5). Dots snap back with
 * elastic easing (returnDuration=1.5 s). The proximity=150 halo colour-shifts
 * dots from baseColor (#5227FF) to activeColor (#00c8ff).
 *
 * Strategy:
 *   1. Settle ~2 s for canvas build and initial GSAP registration.
 *   2. Fast left→right swipe (many steps in short time) across the centre row
 *      to exceed speedTrigger and scatter dots visibly.
 *   3. Wait ~800 ms for dots to begin elastic return.
 *   4. Click at the centre to fire a shockwave — radial bloom visible.
 *   5. Dwell ~2 s watching the elastic snap-back and proximity colour halo.
 */
export default async function capture(page, { W, H, wait }) {
  // Canvas builds synchronously; short settle
  try {
    await wait(2000);
  } catch (_) {}

  const cx = Math.round(W * 0.5);
  const cy = Math.round(H * 0.5);

  // Fast horizontal swipe — few steps = high speed, triggers inertia push
  try {
    await page.mouse.move(Math.round(W * 0.1), cy, { steps: 3 });
    await wait(50);
    await page.mouse.move(Math.round(W * 0.9), cy, { steps: 5 }); // fast!
    await wait(50);
  } catch (e) {
    console.warn('DotGrid: swipe error', e.message);
  }

  // Brief pause — dots scatter and start returning
  try {
    await wait(800);
  } catch (_) {}

  // Click at centre to trigger shockwave
  try {
    await page.mouse.move(cx, cy, { steps: 8 });
    await wait(100);
    await page.mouse.click(cx, cy);
  } catch (e) {
    console.warn('DotGrid: click error', e.message);
  }

  // Dwell — elastic snap-back and proximity halo colour shift
  try {
    await wait(2000);
  } catch (_) {}

  // Hover slowly near centre to show proximity colour gradient
  try {
    const r = 120;
    for (let i = 0; i <= 16; i++) {
      const angle = (i / 16) * 2 * Math.PI;
      const px = Math.round(cx + r * Math.cos(angle));
      const py = Math.round(cy + r * Math.sin(angle));
      await page.mouse.move(px, py, { steps: 4 });
      await wait(70);
    }
  } catch (e) {
    console.warn('DotGrid: proximity orbit error', e.message);
  }

  try {
    await page.mouse.move(cx, cy, { steps: 10 });
    await wait(500);
  } catch (_) {}
}
