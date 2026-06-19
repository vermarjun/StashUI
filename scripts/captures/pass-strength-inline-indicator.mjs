/**
 * Capture choreography for pass-strength-inline-indicator
 *
 * Password input whose border colour changes from neutral → red → orange →
 * amber → green as strength increases. An Info icon in the label row opens a
 * HoverCard with the requirements list on hover.
 *
 * Strategy:
 *   1. Type weak password so border turns red.
 *   2. Hover the Info icon so the HoverCard requirement list appears.
 *   3. Type more characters to improve strength (border goes green).
 *   4. Re-hover Info icon to show all checks green.
 *   5. Click eye to reveal password.
 */
export default async function capture(page, { W, H, wait }) {
  try {
    try { await wait(300); } catch (_) {}

    const input = page.locator('#password').first();

    // Type a weak password first (border → red)
    try { await input.click(); } catch (_) {}
    try { await input.type('abc', { delay: 100 }); } catch (_) {}
    try { await wait(400); } catch (_) {}

    // Hover the Info icon to open the HoverCard popover
    try {
      await page.locator('svg[class*="lucide-info"], [data-lucide="info"]').first().hover();
    } catch (_) {
      try { await page.locator('svg').filter({ hasText: '' }).nth(0).hover(); } catch (_) {}
    }
    try { await wait(500); } catch (_) {}

    // Now type more characters to satisfy all requirements
    try { await input.click(); } catch (_) {}
    try { await input.type('DEFGH12!', { delay: 90 }); } catch (_) {}
    try { await wait(500); } catch (_) {}

    // Hover the Info icon again — all requirements should now be green checks
    try {
      await page.locator('svg[class*="lucide-info"], [data-lucide="info"]').first().hover();
    } catch (_) {}
    try { await wait(600); } catch (_) {}

    // Reveal password with eye toggle
    try {
      await page.locator('button[aria-label*="password" i]').first().click();
    } catch (_) {}
    try { await wait(400); } catch (_) {}
  } catch (err) {
    console.error('pass-strength-inline-indicator capture error:', err);
  }
}
