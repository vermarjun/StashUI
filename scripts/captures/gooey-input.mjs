/**
 * Capture choreography for: gooey-input
 * Behaviour: A pill-shaped "Search" button expands on click via a gooey SVG
 * filter — the icon bubble morphs off to the left while the input slides in.
 * Choreography: rest → click to expand (gooey morph) → type a query →
 * dwell → blur to collapse → rest.
 */
export default async function capture(page, { W, H, cfg, wait }) {
  // Let entrance animations settle
  await wait(500);

  // --- Click the collapsed trigger to expand ---
  try {
    // The trigger is a button containing the search icon + collapsed input
    const trigger = page.locator('button[type="button"]').first();
    await trigger.click({ timeout: 3000 });
    await wait(600); // spring expansion animation (~400 ms)
  } catch (err) {
    console.error('[gooey-input] expand click error:', err.message);
  }

  // --- Type realistic text into the now-expanded input ---
  try {
    const input = page.locator('input[type="search"]').first();
    await input.waitFor({ state: 'visible', timeout: 2000 });
    await input.type('design systems', { delay: 80 });
    await wait(700);
  } catch (err) {
    console.error('[gooey-input] type error:', err.message);
  }

  // --- Dwell so the viewer sees the filled state ---
  await wait(600);

  // --- Blur the input — gooey morph collapses back to pill ---
  try {
    const input = page.locator('input[type="search"]').first();
    // Clear text first so onBlur triggers collapse (component collapses only when empty)
    await input.selectAll?.();
    await page.keyboard.press('Control+A');
    await page.keyboard.press('Backspace');
    await wait(200);
    await input.blur();
    await wait(600); // collapse spring animation
  } catch (err) {
    console.error('[gooey-input] blur/collapse error:', err.message);
  }

  // --- Rest near centre so loop cut is clean ---
  try {
    await page.mouse.move(W / 2, H / 2, { steps: 8 });
  } catch { /* ignore */ }
  await wait(400);
}
