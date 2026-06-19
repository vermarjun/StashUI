/**
 * Capture choreography for flip-words.
 *
 * Behaviour: FlipWords cycles through a word list on a timer (default ~3s
 * per word). Each transition blurs and flips the outgoing word out, then flips
 * the new word in. Dwell ~3.5s per flip cycle; capture 2–3 flips total (~7s).
 * No pointer interaction required.
 */
export default async function capture(page, { W, H, cfg, wait }) {
  // Wait for the FlipWords container
  try {
    await page.waitForSelector('.text-4xl', { timeout: 6000 });
  } catch { /* ignore */ }

  // Settle before first flip
  try {
    await wait(500);
  } catch { /* ignore */ }

  // Move mouse to neutral centre
  try {
    await page.mouse.move(W * 0.5, H * 0.5, { steps: 6 });
  } catch { /* ignore */ }

  // Wait for first flip (~3s) plus transition time
  try {
    await wait(3500);
  } catch { /* ignore */ }

  // Wait for second flip
  try {
    await wait(3500);
  } catch { /* ignore */ }

  // End near top-centre (clean loop point just before next flip)
  try {
    await page.mouse.move(W * 0.5, H * 0.2, { steps: 5 });
    await wait(200);
  } catch { /* ignore */ }
}
