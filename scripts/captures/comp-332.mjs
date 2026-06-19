/**
 * Choreography: comp-332
 * Onboarding dialog — click "Onboarding" button, dialog shows a 4-step wizard
 * with an image, title, description, step dots, Next/Skip buttons.
 * Click through all 4 steps, then close.
 */
export default async function capture(page, { W, H, wait }) {
  // 1. Mount settle
  try { await wait(800); } catch (_) {}

  // 2. Click the trigger button
  try {
    await page.getByRole('button', { name: /onboarding/i }).first().click();
    await wait(800);
  } catch (_) {
    try { await page.getByRole('button').first().click(); await wait(800); } catch (_) {}
  }

  // 3. Dwell on step 1 "Welcome to coss.com"
  try { await wait(1000); } catch (_) {}

  // 4. Click "Next" to advance to step 2
  try {
    await page.getByRole('button', { name: /next/i }).click();
    await wait(700);
  } catch (_) {}

  // 5. Dwell on step 2 "Customizable Components"
  try { await wait(800); } catch (_) {}

  // 6. Click "Next" to advance to step 3
  try {
    await page.getByRole('button', { name: /next/i }).click();
    await wait(700);
  } catch (_) {}

  // 7. Dwell on step 3 "Ready to Start?"
  try { await wait(800); } catch (_) {}

  // 8. Click "Next" to advance to step 4
  try {
    await page.getByRole('button', { name: /next/i }).click();
    await wait(700);
  } catch (_) {}

  // 9. Dwell on step 4 "Get Support" with Okay button
  try { await wait(800); } catch (_) {}

  // 10. Close via Escape
  try { await page.keyboard.press('Escape'); await wait(400); } catch (_) {}
}
