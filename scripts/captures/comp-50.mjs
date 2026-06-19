// comp-50 — credit card payment form with three stacked inputs:
// card number (full-width, top), expiry date (bottom-left), CVC (bottom-right).
// Sequence: type card number → tab to expiry → type expiry → tab to CVC → type CVC → rest.
export default async function capture(page, { W, H, wait }) {
  await wait(400);

  // Focus and type card number
  try {
    const cardInput = page.locator('input[name="cardNumber"], input[placeholder*="card" i], input[autocomplete*="cc-number"]').first();
    await cardInput.waitFor({ state: 'visible', timeout: 4000 });
    await cardInput.click();
    await wait(200);
    await page.keyboard.type('4111 1111 1111 1111', { delay: 55 });
    await wait(500);
  } catch {
    try {
      await page.locator('input').first().click({ timeout: 3000 });
      await wait(200);
      await page.keyboard.type('4111111111111111', { delay: 55 });
      await wait(500);
    } catch { /* ignore */ }
  }

  // Move to expiry date field
  try {
    const expiryInput = page.locator('input[name="expiryDate"], input[placeholder*="MM" i], input[autocomplete*="cc-exp"]').first();
    await expiryInput.click({ timeout: 3000 });
    await wait(200);
    await page.keyboard.type('12/27', { delay: 70 });
    await wait(400);
  } catch {
    try {
      await page.locator('input').nth(1).click({ timeout: 2000 });
      await wait(200);
      await page.keyboard.type('12/27', { delay: 70 });
      await wait(400);
    } catch { /* ignore */ }
  }

  // Move to CVC field
  try {
    const cvcInput = page.locator('input[name="cvc"], input[placeholder*="CVC" i], input[autocomplete*="cc-csc"]').first();
    await cvcInput.click({ timeout: 3000 });
    await wait(200);
    await page.keyboard.type('321', { delay: 80 });
    await wait(500);
  } catch {
    try {
      await page.locator('input').nth(2).click({ timeout: 2000 });
      await wait(200);
      await page.keyboard.type('321', { delay: 80 });
      await wait(500);
    } catch { /* ignore */ }
  }

  // Move mouse away to end near start
  try {
    await page.mouse.move(W / 2, H * 0.15, { steps: 10 });
  } catch { /* ignore */ }
  await wait(400);
}
