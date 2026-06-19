/**
 * Capture choreography for text-generate-effect.
 *
 * Behaviour: On mount each word fades/blurs in sequentially with a staggered
 * delay. The effect fires once on load; a tiny scroll away + back resets the
 * IntersectionObserver so the animation replays, giving the video a second pass.
 */
export default async function capture(page, { W, H, cfg, wait }) {
  // Wait for the text container to appear
  try {
    await page.waitForSelector('.w-full.max-w-2xl', { timeout: 6000 });
  } catch { /* ignore */ }

  // Allow first-pass animation to complete (~2s for ~10 words at 0.2s each)
  try {
    await wait(2500);
  } catch { /* ignore */ }

  // Tiny scroll down to push content out of view, then back to retrigger
  try {
    await page.mouse.wheel(0, 80);
    await wait(200);
    await page.mouse.wheel(0, -80);
    await wait(300);
  } catch { /* ignore */ }

  // Dwell for the second animation pass
  try {
    await wait(2500);
  } catch { /* ignore */ }

  // End with mouse at centre
  try {
    await page.mouse.move(W * 0.5, H * 0.5, { steps: 6 });
    await wait(300);
  } catch { /* ignore */ }
}
