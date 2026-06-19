/**
 * Choreography: autoscroll-slider
 *
 * Component: AutoScrollSlider — Embla carousel with embla-carousel-auto-scroll
 * plugin (speed:2, stopOnMouseEnter:true, stopOnInteraction:false). 4 coloured
 * slides of variable widths (40%, 80%, 40%, 80%), loop:true.
 *
 * Strategy: the carousel auto-scrolls continuously. Dwell ~4 s to capture it
 * in motion. Hover the carousel to pause (stopOnMouseEnter), hold briefly to
 * show the paused state, then move away to let it resume. End near start.
 */
export default async function capture(page, { W, H, wait }) {
  // Let auto-scroll start (startDelay is 100ms).
  try {
    await wait(600);
  } catch (_) {}

  // Approximate carousel centre — it is w-4/5 mx-auto.
  const carouselCx = Math.round(W * 0.5);
  const carouselCy = Math.round(H * 0.45);

  // Dwell while auto-scrolling — let at least 1.5 full slides pass.
  try {
    await wait(2000);
  } catch (_) {}

  // Move mouse onto the carousel to pause auto-scroll.
  try {
    await page.mouse.move(carouselCx, carouselCy, { steps: 12 });
    await wait(100);
  } catch (_) {}

  // Hold hover — carousel is paused, shows current slide position clearly.
  try {
    await wait(1400);
  } catch (_) {}

  // Slow drift across the carousel while hovering (still paused).
  try {
    await page.mouse.move(Math.round(W * 0.3), carouselCy, { steps: 20 });
    await wait(500);
  } catch (_) {}

  // Move off the carousel — auto-scroll resumes.
  try {
    await page.mouse.move(Math.round(W * 0.5), Math.round(H * 0.1), { steps: 14 });
    await wait(100);
  } catch (_) {}

  // Let it scroll a bit more after resuming.
  try {
    await wait(1200);
  } catch (_) {}

  // Return to neutral above the carousel.
  try {
    await page.mouse.move(Math.round(W * 0.5), Math.round(H * 0.1), { steps: 10 });
    await wait(300);
  } catch (_) {}
}
