/**
 * Capture choreography for comp-51
 * Type: PASSWORD with strength indicator — text input (togglable visibility) + live
 * strength bar + requirement checklist.
 * Sequence:
 *   1. Focus password field → type weak password → pause (bar turns red, all reqs ✗)
 *   2. Continue typing to medium → pause (bar amber)
 *   3. Complete to strong (8+ chars, upper, lower, digit) → pause (bar green, all reqs ✓)
 *   4. Click show-password toggle → field reveals text → click again to hide
 *   5. End near start.
 */
export default async function choreograph({ page, W, H }) {
  await page.waitForTimeout(500);

  // Focus the password input
  try {
    const pwInput = page.getByPlaceholder('Password');
    await pwInput.waitFor({ state: 'visible', timeout: 4000 });
    await pwInput.click();
    await page.waitForTimeout(300);

    // Type a weak password first — only lowercase, short
    await pwInput.type('abc', { delay: 100 });
    await page.waitForTimeout(700);

    // Extend to medium — adds digits
    await pwInput.type('123', { delay: 100 });
    await page.waitForTimeout(700);

    // Complete to strong — add uppercase + reach 8 chars
    await pwInput.type('Xy', { delay: 100 });
    await page.waitForTimeout(900);

    // Toggle visibility: show password
    try {
      const toggleBtn = page.getByRole('button', { name: /show password/i });
      await toggleBtn.click();
      await page.waitForTimeout(700);

      // Hide again
      const hideBtn = page.getByRole('button', { name: /hide password/i });
      await hideBtn.click();
      await page.waitForTimeout(500);
    } catch (_) {
      // Fallback: click the absolute button at the end of the input
      try {
        const btn = page.locator('button[aria-pressed]').first();
        await btn.click();
        await page.waitForTimeout(700);
        await btn.click();
        await page.waitForTimeout(500);
      } catch (_) {}
    }
  } catch (err) {
    try {
      const input = page.locator('input[type="password"], input[type="text"]').first();
      await input.click();
      await page.waitForTimeout(300);
      await input.type('abc123Xy', { delay: 90 });
      await page.waitForTimeout(900);
    } catch (_) {}
  }

  // End near centre
  try {
    await page.mouse.move(W * 0.5, H * 0.5, { steps: 10 });
    await page.waitForTimeout(300);
  } catch (_) {}
}
