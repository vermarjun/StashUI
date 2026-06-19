/**
 * Capture choreography for: vanishing-input (Inspira React)
 * Behaviour: Cycling placeholder text rotates every 3 s. Typing and pressing
 * Enter (or clicking the submit button) triggers a Canvas pixel-dissolution
 * animation before the input resets and auto-focuses.
 * Choreography: rest (show placeholder cycling) → focus → type a sentence →
 * press Enter (pixel vanish) → wait for reset → focus again → type a second
 * shorter query → click submit button → wait for vanish → rest.
 */
export default async function capture(page, { W, H, cfg, wait }) {
  // Let placeholder animate in
  await wait(800);

  // --- Dwell so at least one placeholder is visible before interaction ---
  await wait(600);

  // --- Focus the input ---
  try {
    const input = page.locator('input[type="text"]').first();
    await input.click({ timeout: 3000 });
    await wait(400);
  } catch (err) {
    console.error('[vanishing-input] focus error:', err.message);
  }

  // --- Type a realistic sentence ---
  try {
    const input = page.locator('input[type="text"]').first();
    await input.type('best open source UI libraries', { delay: 70 });
    await wait(700);
  } catch (err) {
    console.error('[vanishing-input] type error:', err.message);
  }

  // --- Press Enter to trigger the pixel vanish animation ---
  try {
    await page.keyboard.press('Enter');
    // Wait for pixel dissolution animation (~1.2 s) then auto-reset
    await wait(1800);
  } catch (err) {
    console.error('[vanishing-input] submit Enter error:', err.message);
  }

  // --- Type a second shorter query after reset ---
  try {
    const input = page.locator('input[type="text"]').first();
    await input.waitFor({ state: 'visible', timeout: 2000 });
    // Component auto-focuses after reset; type directly
    await page.keyboard.type('tailwind components', { delay: 75 });
    await wait(600);
  } catch (err) {
    console.error('[vanishing-input] second type error:', err.message);
  }

  // --- Click the submit button (arrow button on right) ---
  try {
    const submitBtn = page.locator('button[type="submit"]').first();
    await submitBtn.click({ timeout: 2000 });
    // Watch the second vanish
    await wait(1800);
  } catch (err) {
    console.error('[vanishing-input] submit button error:', err.message);
  }

  // --- Settle on cleared state ---
  await wait(500);

  // --- Return mouse to neutral ---
  try {
    await page.mouse.move(W / 2, H / 2, { steps: 8 });
  } catch { /* ignore */ }
  await wait(300);
}
