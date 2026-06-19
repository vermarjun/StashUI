/**
 * Choreography: comp-331
 * Edit profile dialog — click "Edit profile" button, dialog shows profile bg image,
 * avatar, and form fields for name/username/website/bio.
 */
export default async function capture(page, { W, H, wait }) {
  // 1. Mount settle
  try { await wait(800); } catch (_) {}

  // 2. Click the trigger button
  try {
    await page.getByRole('button', { name: /edit profile/i }).first().click();
    await wait(800);
  } catch (_) {
    try { await page.getByRole('button').first().click(); await wait(800); } catch (_) {}
  }

  // 3. Dwell on the open dialog showing profile header image and avatar
  try { await wait(1500); } catch (_) {}

  // 4. Click into the First name field
  try {
    const firstNameInput = page.getByLabel(/first name/i).first();
    await firstNameInput.click();
    await wait(500);
  } catch (_) {}

  // 5. Scroll down inside the dialog to reveal bio field
  try {
    const dialogContent = page.locator('[role="dialog"]').first();
    await dialogContent.evaluate(el => el.scrollTop += 150);
    await wait(700);
  } catch (_) {}

  // 6. Dwell on the biography textarea
  try { await wait(800); } catch (_) {}

  // 7. Close via Escape
  try { await page.keyboard.press('Escape'); await wait(400); } catch (_) {}
}
