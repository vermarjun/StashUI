/**
 * Capture choreography for text-flipping-board.
 *
 * Behaviour: A 6×22 grid of split-flap cells. On mount each FlapCell receives
 * a staggered delay (colDelay × col + rowDelay × row) then scrambles through
 * random chars before landing on its target character. With default duration
 * BASE_TOTAL_S ≈ 1.2s the board completes its cascade in ~1.2s. Dwell to
 * show the cascade in progress then the settled board.
 * Strategy: wait ~3.5s (covers the full cascade + dwell on settled state)
 * then end.
 */
export default async function capture(page, { W, H, cfg, wait }) {
  // Wait for the board container to appear
  try {
    await page.waitForSelector('.grid', { timeout: 8000 });
  } catch { /* ignore */ }

  // Brief settle before cascade begins
  try {
    await wait(400);
  } catch { /* ignore */ }

  // Mouse at neutral centre
  try {
    await page.mouse.move(W * 0.5, H * 0.5, { steps: 6 });
  } catch { /* ignore */ }

  // Dwell through cascade animation (starts immediately on mount)
  // ~1.2s cascade + ~2.3s settled dwell = 3.5s
  try {
    await wait(3500);
  } catch { /* ignore */ }

  // End near top-centre (clean loop cut)
  try {
    await page.mouse.move(W * 0.5, H * 0.15, { steps: 5 });
    await wait(300);
  } catch { /* ignore */ }
}
