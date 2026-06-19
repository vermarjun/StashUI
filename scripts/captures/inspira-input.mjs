/**
 * Capture choreography for: inspira-input
 * Behaviour: The IInput component renders a radial blue spotlight that follows
 * the cursor over the container wrapper. An inner input shows a focus ring
 * on click. Demo has Email + Password + Disabled fields.
 * Choreography: rest → hover email input (spotlight) → click/focus → type
 * email → hover password input (spotlight tracks) → click → type password →
 * blur → rest.
 * Note: component registered as "inspira-input" but file is input.tsx.
 */
export default async function capture(page, { W, H, cfg, wait }) {
  await wait(400);

  // --- Hover the first input wrapper (email) to reveal the spotlight ---
  try {
    const wrappers = page.locator('.group\\/input');
    const firstBox = await wrappers.first().boundingBox({ timeout: 3000 });
    if (!firstBox) throw new Error('first wrapper not found');

    // Approach from above
    await page.mouse.move(firstBox.x + firstBox.width / 2, firstBox.y - 25, { steps: 8 });
    await page.mouse.move(firstBox.x + firstBox.width / 2, firstBox.y + firstBox.height / 2, { steps: 12 });
    await wait(350);

    // Sweep across to show the spotlight tracking horizontally
    await page.mouse.move(firstBox.x + firstBox.width * 0.2, firstBox.y + firstBox.height / 2, { steps: 10 });
    await wait(200);
    await page.mouse.move(firstBox.x + firstBox.width * 0.8, firstBox.y + firstBox.height / 2, { steps: 10 });
    await wait(250);
  } catch (err) {
    console.error('[inspira-input] hover spotlight error:', err.message);
  }

  // --- Click/focus the email input and type ---
  try {
    const firstInput = page.locator('input[type="email"]').first();
    await firstInput.click({ timeout: 2000 });
    await wait(350);
    await firstInput.type('arjun@example.com', { delay: 70 });
    await wait(600);
    await firstInput.blur();
    await wait(300);
  } catch (err) {
    console.error('[inspira-input] email type error:', err.message);
  }

  // --- Move to password wrapper and show its spotlight ---
  try {
    const wrappers = page.locator('.group\\/input');
    const secondBox = await wrappers.nth(1).boundingBox({ timeout: 2000 });
    if (!secondBox) throw new Error('second wrapper not found');

    await page.mouse.move(secondBox.x + secondBox.width / 2, secondBox.y + secondBox.height / 2, { steps: 14 });
    await wait(350);
  } catch (err) {
    console.error('[inspira-input] password hover error:', err.message);
  }

  // --- Click/focus the password input and type ---
  try {
    const passwordInput = page.locator('input[type="password"]').first();
    await passwordInput.click({ timeout: 2000 });
    await wait(350);
    await passwordInput.type('supersecret42', { delay: 75 });
    await wait(600);
    await passwordInput.blur();
  } catch (err) {
    console.error('[inspira-input] password type error:', err.message);
  }

  // --- Return mouse to neutral ---
  try {
    await page.mouse.move(W / 2, H * 0.1, { steps: 10 });
  } catch { /* ignore */ }
  await wait(400);
}
