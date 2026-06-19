/**
 * Capture choreography for pass-strengthindicator
 *
 * Password input with a colour progress bar (5-segment) and a requirement
 * checklist. Strategy: type a password progressively so the bar fills from
 * empty → weak → medium → strong. End with all requirements met so the bar
 * is fully emerald and all checkmarks are green.
 *
 * Staged typing:
 *   "pass"      → 1 req met (lowercase) → Weak
 *   "passWORD"  → 3 req met (8char + lower + upper) → Strong
 *   "passWORD9" → 4 req met (+ number) → Very Strong
 *   "passWORD9!" → 5 req met (+ special) → full bar
 */
export default async function capture(page, { W, H, wait }) {
  try {
    try { await wait(300); } catch (_) {}

    const input = page.locator('#password').first();

    try { await input.click(); } catch (_) {}
    try { await wait(200); } catch (_) {}

    // Stage 1: 4 chars – lowercase only (weak)
    try { await input.type('pass', { delay: 100 }); } catch (_) {}
    try { await wait(600); } catch (_) {}

    // Stage 2: add uppercase + reach 8 chars (strong)
    try { await input.type('WORD', { delay: 100 }); } catch (_) {}
    try { await wait(600); } catch (_) {}

    // Stage 3: add a number
    try { await input.type('9', { delay: 120 }); } catch (_) {}
    try { await wait(500); } catch (_) {}

    // Stage 4: add a special character → all 5 met, bar fully filled
    try { await input.type('!', { delay: 120 }); } catch (_) {}
    try { await wait(700); } catch (_) {}

    // Click the eye to reveal the password text for a clear final frame
    try {
      await page.locator('button[aria-label*="password" i]').first().click();
    } catch (_) {}
    try { await wait(500); } catch (_) {}
  } catch (err) {
    console.error('pass-strengthindicator capture error:', err);
  }
}
