/**
 * Capture choreography for comp-48
 * Type: TEXT (masked) — Card expiry date input formatted as "MM / YY"
 * via react-payment-inputs.
 * Sequence: focus field → type expiry date → end near start.
 */
export default async function choreograph({ page, W, H }) {
  await page.waitForTimeout(500);

  try {
    const expiryInput = page.getByLabel(/expiry date/i);
    await expiryInput.waitFor({ state: 'visible', timeout: 4000 });
    await expiryInput.click();
    await page.waitForTimeout(300);
    // Type MM/YY — library handles the " / " separator insertion
    await expiryInput.type('1228', { delay: 120 });
    await page.waitForTimeout(800);
  } catch (err) {
    try {
      const input = page.locator('input[placeholder*="MM" i], input[name="expiryDate"]').first();
      await input.click();
      await page.waitForTimeout(300);
      await input.type('1228', { delay: 120 });
      await page.waitForTimeout(800);
    } catch (_) {
      try {
        const input = page.locator('input').first();
        await input.click();
        await page.waitForTimeout(300);
        await input.type('1228', { delay: 120 });
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
