/**
 * Capture choreography for: moving-line
 * Behaviour: A vertical SVG gradient line whose path-length is driven by scroll
 * position — the animated blue stroke shrinks as the user scrolls down.
 * The demo renders three content blocks totalling ~1567 px tall.
 * Choreography: start at top (full line) → slow scroll down → pause to show
 * line retracting → scroll back to top (line restores) → rest for loop.
 */

export default async function capture(page, { W, H, cfg, wait }) {
  // Ensure page is at the top
  try {
    await page.evaluate(() => window.scrollTo(0, 0));
    await wait(600); // let spring settle
  } catch { /* ignore */ }

  // Scroll down slowly to retract the line
  try {
    for (let i = 0; i < 6; i++) {
      await page.mouse.wheel(0, 180);
      await wait(200);
    }
    await wait(700); // dwell — line should be partially retracted
  } catch { /* ignore */ }

  // Continue scrolling further
  try {
    for (let i = 0; i < 6; i++) {
      await page.mouse.wheel(0, 180);
      await wait(180);
    }
    await wait(600);
  } catch { /* ignore */ }

  // Scroll back to top — line restores (spring animation plays)
  try {
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'smooth' }));
    await wait(1400); // spring + smooth scroll takes ~1 s
  } catch { /* ignore */ }

  // Rest so the loop cuts cleanly at the full-line state
  try {
    await wait(500);
  } catch { /* ignore */ }
}
