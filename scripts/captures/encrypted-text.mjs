/**
 * Capture choreography for encrypted-text.
 *
 * Behaviour: On IntersectionObserver firing (element enters viewport),
 * characters are revealed left-to-right at revealDelayMs (default 50ms) per
 * char while unrevealed chars flip through random gibberish at flipDelayMs
 * (50ms). Demo text "Decrypting the future" = 21 chars → full reveal ~1050ms.
 * The component uses useInView({ once: true }) so it fires on first mount.
 * Dwell 3s total: ~1s for decrypt animation + ~2s display time.
 */
export default async function capture(page, { W, H, cfg, wait }) {
  // Wait for the encrypted text span to enter the DOM
  try {
    await page.waitForSelector('[role="text"]', { timeout: 6000 });
  } catch { /* ignore */ }

  // Brief settle to ensure IntersectionObserver has fired
  try {
    await wait(300);
  } catch { /* ignore */ }

  // Mouse at neutral centre (no interaction effect)
  try {
    await page.mouse.move(W * 0.5, H * 0.5, { steps: 6 });
  } catch { /* ignore */ }

  // Dwell through scramble phase + full reveal (~3s)
  try {
    await wait(3000);
  } catch { /* ignore */ }

  // End near top-centre
  try {
    await page.mouse.move(W * 0.5, H * 0.2, { steps: 5 });
    await wait(300);
  } catch { /* ignore */ }
}
