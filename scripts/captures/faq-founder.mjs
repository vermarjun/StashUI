/**
 * Choreography: faq-founder
 * FAQ with profile card on the left and expandable question cards on the right.
 * Click questions to expand/collapse answers.
 */
export default async function capture(page, { W, H, wait }) {
  // 1. Mount settle (timeline animations need time to paint in)
  try { await wait(1000); } catch (_) {}

  // 2. Click first FAQ button
  try {
    await page.getByRole('button').nth(0).click({ timeout: 2500 });
    await wait(600);
  } catch (_) {}

  // 3. Dwell on open answer
  try { await wait(1200); } catch (_) {}

  // 4. Click second FAQ button
  try {
    await page.getByRole('button').nth(1).click({ timeout: 2500 });
    await wait(600);
  } catch (_) {}

  // 5. Dwell
  try { await wait(1200); } catch (_) {}

  // 6. Click third FAQ
  try {
    await page.getByRole('button').nth(2).click({ timeout: 2500 });
    await wait(600);
  } catch (_) {}

  // 7. Final dwell
  try { await wait(800); } catch (_) {}
}
