/**
 * Choreography: special-offer
 * Countdown timer banner — self-animating (seconds tick). Hover promo code.
 */
export default async function capture(page, { W, H, wait }) {
  // 1. Settle and let the timer render
  try { await wait(800); } catch (_) {}

  // 2. Dwell showing countdown ticking
  try { await wait(2000); } catch (_) {}

  // 3. Hover the promo code box
  try {
    await page.locator('text=CBRLAYOUT').first().hover({ timeout: 2500 });
    await wait(700);
  } catch (_) {
    try {
      await page.mouse.move(Math.round(W * 0.8), H / 2, { steps: 10 });
      await wait(700);
    } catch (_) {}
  }

  // 4. Final dwell
  try { await wait(1000); } catch (_) {}
}
