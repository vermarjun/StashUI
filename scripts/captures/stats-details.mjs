/**
 * Capture choreography for stats-details (DetailedStats).
 * Single-screen 3-col card grid. Each card has a group-hover reveal:
 * icon turns orange, text lightens, background image fades in.
 * Dwell first, then hover each card in sequence.
 */
export default async function capture(page) {
  try {
    await page.evaluate(() => window.scrollTo(0, 0));
  } catch (_) {}

  // Dwell so page renders
  try {
    await page.waitForTimeout(1000);
  } catch (_) {}

  // Hover all three stat cards in sequence
  try {
    const cards = await page.$$('.group.p-8');
    for (const card of cards) {
      try {
        await card.hover();
        await page.waitForTimeout(700);
      } catch (_) {}
    }
  } catch (_) {}

  // Brief pause after last hover
  try {
    await page.waitForTimeout(400);
  } catch (_) {}

  // End at top (no scroll occurred)
  try {
    await page.evaluate(() => window.scrollTo(0, 0));
  } catch (_) {}
}
