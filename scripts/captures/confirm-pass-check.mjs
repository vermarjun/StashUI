/**
 * Capture choreography for confirm-pass-check
 *
 * Two password inputs: primary (with strength info popover) and confirm
 * (turns green on match, red on mismatch). Strategy:
 *   1. Type a strong password in the first field.
 *   2. Type a mismatching string in the confirm field (border goes red).
 *   3. Clear the confirm field and retype the same password → border goes green.
 *   4. Click the eye button to reveal both fields.
 */
export default async function capture(page, { W, H, wait }) {
  try {
    try { await wait(300); } catch (_) {}

    // Type a fully-strong password in the primary field
    const primary = page.locator('#password').first();
    try { await primary.click(); } catch (_) {}
    try { await primary.type('passWORD9!', { delay: 90 }); } catch (_) {}
    try { await wait(400); } catch (_) {}

    // Click into the confirm field and type a mismatch
    const confirm = page.locator('#confirm-password').first();
    try { await confirm.click(); } catch (_) {}
    try { await confirm.type('wrong', { delay: 100 }); } catch (_) {}
    try { await wait(500); } catch (_) {}

    // Clear the confirm field and type the matching password
    try { await confirm.selectText(); } catch (_) {
      try { await confirm.fill(''); } catch (_) {}
    }
    try { await confirm.fill(''); } catch (_) {}
    try { await confirm.type('passWORD9!', { delay: 90 }); } catch (_) {}
    try { await wait(600); } catch (_) {}

    // Reveal both fields with the eye toggle on the primary input
    try {
      await page.locator('button[aria-label*="password" i]').first().click();
    } catch (_) {}
    try { await wait(500); } catch (_) {}
  } catch (err) {
    console.error('confirm-pass-check capture error:', err);
  }
}
