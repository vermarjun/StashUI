/**
 * Capture choreography for: meteors
 * Behaviour: Full-bleed falling meteor shower animation — meteors streak diagonally
 * across the frame on random delays. No interaction needed; dwell to let the
 * animation play through several streaks then loop cleanly.
 */

export default async function capture(page, { W, H, cfg, wait }) {
  // Wait for the motion fade-in to complete
  try {
    await page.waitForSelector('[class*="animate-meteor"]', { timeout: 4000 });
  } catch {
    // ignore if selector not matched — animation may still be running
  }

  // Dwell at the start so the first wave of meteors fully appears
  try {
    await wait(1200);
  } catch { /* ignore */ }

  // Move mouse gently to centre (no interaction effect, but makes recording natural)
  try {
    await page.mouse.move(W * 0.5, H * 0.5, { steps: 10 });
    await wait(800);
  } catch { /* ignore */ }

  // Let a second wave of meteors fall through
  try {
    await wait(1000);
  } catch { /* ignore */ }

  // Return mouse to top-centre so the loop cuts cleanly
  try {
    await page.mouse.move(W * 0.5, H * 0.1, { steps: 8 });
    await wait(600);
  } catch { /* ignore */ }
}
