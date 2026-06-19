/**
 * Capture choreography for: aceternity-ui-meteors (shared source: meteors.tsx)
 * Behaviour: Full-bleed falling meteor shower — meteors streak diagonally on
 * staggered random delays. No pointer interaction; dwell to let several
 * streaks complete then loop cleanly.
 */

export default async function capture(page, { W, H, cfg, wait }) {
  // Wait for the motion fade-in to complete
  try {
    await page.waitForSelector('[class*="animate-meteor"]', { timeout: 4000 });
  } catch {
    // ignore — animation may still run without the selector resolving
  }

  // First dwell — initial wave of meteors falls
  try {
    await wait(1200);
  } catch { /* ignore */ }

  // Move mouse to centre (natural, no interaction effect)
  try {
    await page.mouse.move(W * 0.5, H * 0.5, { steps: 10 });
    await wait(800);
  } catch { /* ignore */ }

  // Second dwell — second wave
  try {
    await wait(1000);
  } catch { /* ignore */ }

  // Return to top-centre for a clean loop cut
  try {
    await page.mouse.move(W * 0.5, H * 0.1, { steps: 8 });
    await wait(600);
  } catch { /* ignore */ }
}
