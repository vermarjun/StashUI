/**
 * Capture choreography for stats-banner.
 * Taller-than-one-screen section (min-h-screen + py-20). Slow wheel-scroll
 * down to trigger whileInView reveals and count-up animations on stat cards,
 * then scroll back to top.
 */
export default async function capture(page) {
  try {
    await page.evaluate(() => window.scrollTo(0, 0));
  } catch (_) {}

  // Dwell at top so header animations fire first
  try {
    await page.waitForTimeout(700);
  } catch (_) {}

  // Slow scroll down in 5 steps to progressively reveal hero stat + grid cards
  const viewportHeight = 660;
  const step = viewportHeight * 0.7;
  for (let i = 0; i < 5; i++) {
    try {
      await page.mouse.wheel(0, step);
      await page.waitForTimeout(450);
    } catch (_) {}
  }

  // Brief pause at bottom so final stat cards animate in
  try {
    await page.waitForTimeout(800);
  } catch (_) {}

  // Hover one of the stat boxes for the lift effect
  try {
    const statBox = await page.$('.rounded-2xl');
    if (statBox) {
      await statBox.hover();
      await page.waitForTimeout(400);
    }
  } catch (_) {}

  // Return to top
  try {
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
    await page.waitForTimeout(300);
  } catch (_) {}
}
