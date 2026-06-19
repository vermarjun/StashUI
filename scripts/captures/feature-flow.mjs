/**
 * Capture choreography for feature-flow (scroll:false).
 *
 * Component: horizontal carousel of 8 feature cards with prev/next
 * arrow buttons. The header + first 4 cards fit in a single viewport.
 * Strategy: hover over header area to show it clearly, click the Next
 * button twice to advance the carousel, dwell, click Prev once to
 * partially reverse, then park.
 */
export default async function capture(page, { W, H, cfg, wait }) {
  // Let whileInView animations settle
  try {
    await wait(700);
  } catch (_) {}

  // Hover over the feature section header briefly
  try {
    await page.mouse.move(Math.round(W * 0.25), Math.round(H * 0.25), { steps: 10 });
    await wait(400);
  } catch (_) {}

  // Hover first visible card
  try {
    await page.mouse.move(Math.round(W * 0.15), Math.round(H * 0.62), { steps: 10 });
    await wait(450);
  } catch (_) {}

  // Click the Next (ChevronRight) button — it sits in the top-right area of the section
  try {
    const nextBtn = page.locator('[aria-label="Next"]').first();
    await nextBtn.waitFor({ state: 'visible', timeout: 5000 });
    await nextBtn.click();
    await wait(550);
  } catch (_) {
    // Fallback: click at approximate next-button position (top-right of section)
    try {
      await page.mouse.click(Math.round(W * 0.88), Math.round(H * 0.32));
      await wait(550);
    } catch (_2) {}
  }

  // Click Next again to advance further
  try {
    const nextBtn = page.locator('[aria-label="Next"]').first();
    await nextBtn.click();
    await wait(550);
  } catch (_) {
    try {
      await page.mouse.click(Math.round(W * 0.88), Math.round(H * 0.32));
      await wait(550);
    } catch (_2) {}
  }

  // Hover a newly revealed card
  try {
    await page.mouse.move(Math.round(W * 0.55), Math.round(H * 0.62), { steps: 10 });
    await wait(500);
  } catch (_) {}

  // Click Prev once to partially reverse
  try {
    const prevBtn = page.locator('[aria-label="Previous"]').first();
    await prevBtn.click();
    await wait(500);
  } catch (_) {
    try {
      await page.mouse.click(Math.round(W * 0.8), Math.round(H * 0.32));
      await wait(500);
    } catch (_2) {}
  }

  // Park mouse away from buttons
  try {
    await page.mouse.move(Math.round(W * 0.5), Math.round(H * 0.55), { steps: 8 });
    await wait(400);
  } catch (_) {}
}
