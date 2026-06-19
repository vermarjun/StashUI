/**
 * Capture choreography for: input (Aceternity UI)
 * Behaviour: A motion.div wrapper renders a radial blue spotlight that follows
 * the cursor; the inner input shows a focus ring when clicked.
 * Choreography: rest → hover first input (spotlight appears) → click/focus →
 * type email → hover second input (spotlight tracks) → click → type name →
 * blur → rest.
 */
export default async function capture(page, { W, H, cfg, wait }) {
  await wait(400);

  // --- Hover the first input to reveal the spotlight gradient ---
  try {
    const firstWrap = page.locator('.group\\/input').first();
    const box = await firstWrap.boundingBox({ timeout: 3000 });
    if (!box) throw new Error('wrapper not found');

    // Glide in from above
    await page.mouse.move(box.x + box.width / 2, box.y - 30, { steps: 8 });
    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2, { steps: 12 });
    await wait(400);

    // Drift across to show the spotlight tracking
    await page.mouse.move(box.x + box.width * 0.25, box.y + box.height / 2, { steps: 10 });
    await wait(250);
    await page.mouse.move(box.x + box.width * 0.75, box.y + box.height / 2, { steps: 10 });
    await wait(250);
  } catch (err) {
    console.error('[input] hover spotlight error:', err.message);
  }

  // --- Click/focus the first input and type ---
  try {
    const firstInput = page.locator('input').first();
    await firstInput.click({ timeout: 2000 });
    await wait(350);
    await firstInput.type('hello@example.com', { delay: 70 });
    await wait(600);
    await firstInput.blur();
    await wait(300);
  } catch (err) {
    console.error('[input] type email error:', err.message);
  }

  // --- Move to second input and show spotlight there ---
  try {
    const secondWrap = page.locator('.group\\/input').nth(1);
    const box2 = await secondWrap.boundingBox({ timeout: 2000 });
    if (!box2) throw new Error('second wrapper not found');

    await page.mouse.move(box2.x + box2.width / 2, box2.y + box2.height / 2, { steps: 14 });
    await wait(400);

    const secondInput = page.locator('input').nth(1);
    await secondInput.click({ timeout: 2000 });
    await wait(350);
    await secondInput.type('Jane Smith', { delay: 75 });
    await wait(600);
    await secondInput.blur();
  } catch (err) {
    console.error('[input] type name error:', err.message);
  }

  // --- Return mouse to neutral ---
  try {
    await page.mouse.move(W / 2, H * 0.1, { steps: 10 });
  } catch { /* ignore */ }
  await wait(400);
}
