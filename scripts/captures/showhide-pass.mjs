/**
 * Capture choreography for showhide-pass
 *
 * A password input with an Eye/EyeOff icon toggle. Strategy: focus the
 * input and type a password, pause so the dots are visible, then click the
 * eye icon to reveal the text — hold a beat — then click again to hide it.
 */
export default async function capture(page, { W, H, wait }) {
  try {
    try { await wait(300); } catch (_) {}

    // Focus and type a password
    try {
      const input = page.getByPlaceholder('Password').first();
      await input.click();
      await input.type('MySecret@99', { delay: 80 });
    } catch (_) {}

    try { await wait(500); } catch (_) {}

    // Click the Eye/EyeOff toggle to reveal the password
    try {
      // The toggle is the div wrapping the Eye icon (not a <button>)
      await page.locator('div.absolute.top-3.right-4').click();
    } catch (_) {
      try {
        // Fallback: click by coordinates — eye icon sits near top-right of input
        await page.locator('[class*="absolute"][class*="right"]').last().click();
      } catch (_) {}
    }

    try { await wait(700); } catch (_) {}

    // Click the toggle again to hide (return to masked state)
    try {
      await page.locator('div.absolute.top-3.right-4').click();
    } catch (_) {
      try {
        await page.locator('[class*="absolute"][class*="right"]').last().click();
      } catch (_) {}
    }

    try { await wait(400); } catch (_) {}
  } catch (err) {
    console.error('showhide-pass capture error:', err);
  }
}
