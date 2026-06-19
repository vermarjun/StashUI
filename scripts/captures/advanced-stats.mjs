/**
 * Capture choreography for advanced-stats (TimelineAnimation demo).
 * Single-screen staggered blur-in. Dwell so all 6 items animate in sequence
 * (each delayed by 0.5s → last item at ~2.5s).
 */
export default async function capture(page) {
  // Ensure the container is in view so useInView fires
  try {
    await page.evaluate(() => window.scrollTo(0, 0));
  } catch (_) {}

  // Dwell ~3s for the staggered blur-in sequence to complete (6 items × 0.5s)
  try {
    await page.waitForTimeout(3000);
  } catch (_) {}

  // Optionally hover the first heading to add a subtle moment of interactivity
  try {
    const heading = await page.$('.text-2xl');
    if (heading) {
      await heading.hover();
      await page.waitForTimeout(400);
    }
  } catch (_) {}

  // Return near start
  try {
    await page.evaluate(() => window.scrollTo(0, 0));
  } catch (_) {}
}
