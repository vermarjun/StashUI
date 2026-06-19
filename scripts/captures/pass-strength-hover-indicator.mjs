/**
 * Capture choreography for pass-strength-hover-indicator
 *
 * Password input + 5-dot strength bar (same dots as dotted variant) + an
 * Info icon that opens a HoverCard requirements list. The Info icon colour
 * shifts with strength score.
 *
 * Strategy:
 *   1. Focus input, type a short weak password.
 *   2. Hover the Info icon → HoverCard opens showing unmet requirements.
 *   3. Click back to input, continue typing to reach full strength.
 *   4. Hover the Info icon again → all checks are green.
 *   5. End with the popover visible so both bar and checklist are in frame.
 */
export default async function capture(page, { W, H, wait }) {
  try {
    try { await wait(300); } catch (_) {}

    const input = page.locator('#password').first();

    // Stage 1: weak entry
    try { await input.click(); } catch (_) {}
    try { await input.type('pass', { delay: 100 }); } catch (_) {}
    try { await wait(400); } catch (_) {}

    // Hover the Info icon to reveal the requirement HoverCard
    try {
      await page.locator('svg[class*="lucide-info"], [data-lucide="info"]').first().hover();
    } catch (_) {}
    try { await wait(500); } catch (_) {}

    // Click back into input and type the rest of the strong password
    try { await input.click(); } catch (_) {}
    try { await input.type('WORD9!', { delay: 100 }); } catch (_) {}
    try { await wait(500); } catch (_) {}

    // Hover Info icon again — all dots filled, all checks green
    try {
      await page.locator('svg[class*="lucide-info"], [data-lucide="info"]').first().hover();
    } catch (_) {}
    try { await wait(700); } catch (_) {}

    // Click the eye button to reveal the typed password
    try {
      await page.locator('button[aria-label*="password" i]').first().click();
    } catch (_) {}
    try { await wait(400); } catch (_) {}
  } catch (err) {
    console.error('pass-strength-hover-indicator capture error:', err);
  }
}
