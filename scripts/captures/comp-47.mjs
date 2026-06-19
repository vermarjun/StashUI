/**
 * Capture choreography for comp-47
 * Type: TEXT (masked) — Credit card number input formatted as "XXXX XXXX XXXX XXXX"
 * via react-payment-inputs. Shows card type icon on valid prefix.
 * Sequence: focus field → type realistic Visa card number → end near start.
 */
export default async function choreograph({ page, W, H }) {
  await page.waitForTimeout(500);

  try {
    // Find the card number input (has a CreditCard icon sibling)
    const cardInput = page.getByLabel(/card number/i);
    await cardInput.waitFor({ state: 'visible', timeout: 4000 });
    await cardInput.click();
    await page.waitForTimeout(300);
    // Type a Visa test card number — react-payment-inputs auto-inserts spaces
    await cardInput.type('4111111111111111', { delay: 90 });
    await page.waitForTimeout(800);
  } catch (err) {
    try {
      const input = page.locator('input[placeholder*="Card" i], input[name="cardNumber"]').first();
      await input.click();
      await page.waitForTimeout(300);
      await input.type('4111111111111111', { delay: 90 });
      await page.waitForTimeout(800);
    } catch (_) {
      try {
        const input = page.locator('input').first();
        await input.click();
        await page.waitForTimeout(300);
        await input.type('4111111111111111', { delay: 90 });
        await page.waitForTimeout(800);
      } catch (_) {}
    }
  }

  // End near centre
  try {
    await page.mouse.move(W * 0.5, H * 0.5, { steps: 10 });
    await page.waitForTimeout(300);
  } catch (_) {}
}
