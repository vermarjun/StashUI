/**
 * Capture choreography for pass-strength-dotted-indicator
 *
 * Password input with 5 dotted progress dots (rounded spans) and a checklist.
 * Strategy: type progressively so the dots fill from none → all green, then
 * reveal the password with the eye button.
 *
 * Staged typing:
 *   "low"       → 1 dot (lowercase) → Weak
 *   "lowUP"     → 2 dots (+ uppercase) → Medium
 *   "lowUP12345678" → 3 dots (+ 8 chars) → Strong
 *   "lowUP123456789" → 4 dots (+ number — already met, count stays)
 *   Actually: type to satisfy requirements step by step:
 *   "abcdefgh"  → 2 reqs (lowercase + 8chars)
 *   + "A"       → 3 reqs (+ uppercase)
 *   + "1"       → 4 reqs (+ number)
 *   + "!"       → 5 reqs (+ special)
 */
export default async function capture(page, { W, H, wait }) {
  try {
    try { await wait(300); } catch (_) {}

    const input = page.locator('#password').first();

    try { await input.click(); } catch (_) {}
    try { await wait(200); } catch (_) {}

    // Stage 1: 8 lowercase chars → 2 dots (8-char + lowercase)
    try { await input.type('abcdefgh', { delay: 90 }); } catch (_) {}
    try { await wait(600); } catch (_) {}

    // Stage 2: uppercase → 3 dots
    try { await input.type('A', { delay: 120 }); } catch (_) {}
    try { await wait(500); } catch (_) {}

    // Stage 3: number → 4 dots
    try { await input.type('1', { delay: 120 }); } catch (_) {}
    try { await wait(500); } catch (_) {}

    // Stage 4: special char → all 5 dots
    try { await input.type('@', { delay: 120 }); } catch (_) {}
    try { await wait(700); } catch (_) {}

    // Reveal password with eye toggle
    try {
      await page.locator('button[aria-label*="password" i]').first().click();
    } catch (_) {}
    try { await wait(400); } catch (_) {}
  } catch (err) {
    console.error('pass-strength-dotted-indicator capture error:', err);
  }
}
