/**
 * Capture choreography for stats-bento.
 * Dense bento grid (min-h-screen, flex-centered). No count-up animations —
 * static values with decorative bar-chart. Dwell to let the layout settle,
 * then hover a few cells for visual variety.
 */
export default async function capture(page) {
  try {
    await page.evaluate(() => window.scrollTo(0, 0));
  } catch (_) {}

  // Dwell so the page renders fully
  try {
    await page.waitForTimeout(1200);
  } catch (_) {}

  // Hover the primary dark stat card (top-left large cell)
  try {
    const primaryCard = await page.$('.bg-zinc-950');
    if (primaryCard) {
      await primaryCard.hover();
      await page.waitForTimeout(600);
    }
  } catch (_) {}

  // Hover the growth card
  try {
    const growthCard = await page.$('.bg-zinc-50');
    if (growthCard) {
      await growthCard.hover();
      await page.waitForTimeout(500);
    }
  } catch (_) {}

  // Hover the star/rating card
  try {
    const ratingCard = await page.$('.bg-zinc-100');
    if (ratingCard) {
      await ratingCard.hover();
      await page.waitForTimeout(400);
    }
  } catch (_) {}

  // End at top (no scroll occurred)
  try {
    await page.evaluate(() => window.scrollTo(0, 0));
  } catch (_) {}
}
