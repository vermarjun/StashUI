/**
 * Choreography: inspira-flickering-grid  (file: flickering-grid.tsx)
 * Canvas-based flickering grid. ResizeObserver + IntersectionObserver must
 * fire before animation starts, so settle ~2 s then dwell.
 */
export default async function choreograph({ page, W, H }) {
  // Ensure the canvas is in the viewport so IntersectionObserver triggers
  try {
    await page.evaluate(() => window.scrollTo(0, 0));
  } catch (e) {
    console.warn("scrollTo failed", e.message);
  }

  // Settle: allow ResizeObserver to size the canvas and animation to begin
  await new Promise((r) => setTimeout(r, 2000));

  // Move mouse across the grid slowly — not interactive but keeps page active
  try {
    await page.mouse.move(W * 0.2, H * 0.5, { steps: 10 });
    await new Promise((r) => setTimeout(r, 400));
    await page.mouse.move(W * 0.8, H * 0.5, { steps: 30 });
  } catch (e) {
    console.warn("mouse sweep failed", e.message);
  }

  // Dwell at a mid-flicker frame
  await new Promise((r) => setTimeout(r, 3000));
}
