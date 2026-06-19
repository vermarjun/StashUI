/**
 * Capture choreography for animated-gradient-text.
 *
 * Behaviour: CSS background-position animates at 6s period, sweeping a
 * gradient left→right→left across the clipped text. Auto-playing; no pointer
 * interaction needed. Dwell for ~3s so at least half a sweep cycle is visible,
 * then end near start.
 */
export default async function capture(page, { W, H, cfg, wait }) {
  // Wait for the animated gradient span to appear
  try {
    await page.waitForSelector('[class*="animate-gradient"]', { timeout: 6000 });
  } catch {
    // Component may still be visible even if selector doesn't resolve
  }

  // Brief settle so the page is fully painted
  try {
    await wait(400);
  } catch { /* ignore */ }

  // Move mouse to a neutral centre position (no interaction effect)
  try {
    await page.mouse.move(W * 0.5, H * 0.5, { steps: 8 });
  } catch { /* ignore */ }

  // Dwell for ~3s — covers roughly half the gradient sweep cycle (6s total)
  try {
    await wait(3000);
  } catch { /* ignore */ }

  // Return mouse to top-centre for a clean loop cut point
  try {
    await page.mouse.move(W * 0.5, H * 0.15, { steps: 6 });
    await wait(300);
  } catch { /* ignore */ }
}
