/**
 * Capture choreography for layout-text-flip.
 *
 * Behaviour: A setInterval fires every 3s cycling through word variants.
 * Each transition: outgoing word animates y → 50 + blur out; incoming word
 * animates y from -40 + blur in. Framer Motion layout animations shift the
 * container width. Dwell ~3.5s to catch first flip, then another 3.5s for
 * a second flip, then end.
 */
export default async function capture(page, { W, H, cfg, wait }) {
  // Wait for the text elements to render
  try {
    await page.waitForSelector('.text-2xl', { timeout: 6000 });
  } catch { /* ignore */ }

  // Settle on the initial word
  try {
    await wait(600);
  } catch { /* ignore */ }

  // Mouse at neutral centre
  try {
    await page.mouse.move(W * 0.5, H * 0.5, { steps: 6 });
  } catch { /* ignore */ }

  // First flip cycle — wait slightly over the 3s interval
  try {
    await wait(3500);
  } catch { /* ignore */ }

  // Second flip cycle
  try {
    await wait(3500);
  } catch { /* ignore */ }

  // End near top-centre (clean loop point)
  try {
    await page.mouse.move(W * 0.5, H * 0.2, { steps: 5 });
    await wait(300);
  } catch { /* ignore */ }
}
