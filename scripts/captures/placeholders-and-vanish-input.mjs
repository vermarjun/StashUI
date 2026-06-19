/**
 * Capture choreography for: placeholders-and-vanish-input
 * Behaviour: Cycling placeholder text animates in/out; when the user types and
 * presses Enter (or clicks submit), the text disintegrates via a Canvas pixel
 * animation before the input resets.
 * Choreography: rest → dwell to show placeholder cycling → focus → type a
 * sentence → press Enter (pixel vanish animation) → wait for reset → rest.
 */
export default async function capture(page, { W, H, cfg, wait }) {
  // Let the component mount and first placeholder animate in
  await wait(800);

  // --- Dwell to show placeholder rotation (placeholders cycle every 3 s) ---
  // No interaction needed — just wait for at least one cycle to start
  await wait(1200);

  // --- Focus the input ---
  try {
    const input = page.locator('input[type="text"]').first();
    await input.click({ timeout: 3000 });
    await wait(400);
  } catch (err) {
    console.error('[placeholders-and-vanish-input] focus error:', err.message);
  }

  // --- Type a realistic sentence ---
  try {
    const input = page.locator('input[type="text"]').first();
    await input.type('What is the best design system?', { delay: 65 });
    await wait(700);
  } catch (err) {
    console.error('[placeholders-and-vanish-input] type error:', err.message);
  }

  // --- Submit via Enter → triggers pixel vanish animation ---
  try {
    await page.keyboard.press('Enter');
    // Wait for the pixel dissolution to play (~1 s) then reset
    await wait(1600);
  } catch (err) {
    console.error('[placeholders-and-vanish-input] submit error:', err.message);
  }

  // --- After reset, dwell briefly on the cleared/placeholder state ---
  await wait(600);

  // --- Return mouse to neutral ---
  try {
    await page.mouse.move(W / 2, H / 2, { steps: 8 });
  } catch { /* ignore */ }
  await wait(300);
}
