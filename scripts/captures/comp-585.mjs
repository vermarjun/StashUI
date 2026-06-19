/**
 * Capture choreography for comp-585
 * Social-app nav header: logo + search on left, icon-link nav (Home/Hash/Groups) in center,
 * mail + notification + user on right.
 * Sequence: hover Home icon → hover Hash icon → hover Groups icon → hover mail button → rest.
 */
export default async function choreograph({ page, W, H }) {
  await page.waitForTimeout(500);

  // Hover "Home" icon nav link (center)
  try {
    const home = page.getByRole('link', { name: /home/i });
    await home.waitFor({ state: 'visible', timeout: 4000 });
    await home.first().hover();
    await page.waitForTimeout(600);
  } catch (err) {
    try {
      await page.mouse.move(W * 0.42, H * 0.08, { steps: 8 });
      await page.waitForTimeout(600);
    } catch (_) {}
  }

  // Hover "Hash" icon link
  try {
    const hash = page.getByRole('link', { name: /hash/i });
    await hash.hover();
    await page.waitForTimeout(600);
  } catch (err) {
    try {
      await page.mouse.move(W * 0.50, H * 0.08, { steps: 8 });
      await page.waitForTimeout(600);
    } catch (_) {}
  }

  // Hover "Groups" icon link
  try {
    const groups = page.getByRole('link', { name: /groups/i });
    await groups.hover();
    await page.waitForTimeout(600);
  } catch (err) {
    try {
      await page.mouse.move(W * 0.58, H * 0.08, { steps: 8 });
      await page.waitForTimeout(600);
    } catch (_) {}
  }

  // Hover mail/messages button (right side)
  try {
    const mailBtn = page.getByRole('button', { name: /notifications/i }).first();
    await mailBtn.hover();
    await page.waitForTimeout(600);
  } catch (err) {
    try {
      await page.mouse.move(W * 0.82, H * 0.08, { steps: 8 });
      await page.waitForTimeout(600);
    } catch (_) {}
  }

  // Rest — back to logo/search area
  try {
    await page.mouse.move(W * 0.1, H * 0.08, { steps: 12 });
    await page.waitForTimeout(400);
  } catch (_) {}
}
