/**
 * Choreography: faq-accordion
 * Simple FAQ with Plus/Minus icon. Click questions to reveal answers.
 */
export default async function capture(page, { W, H, wait }) {
  // 1. Mount settle
  try { await wait(700); } catch (_) {}

  // 2. Click first question (already open at index 0)
  try {
    await page.getByRole('button').nth(0).click({ timeout: 2500 });
    await wait(600);
  } catch (_) {}

  // 3. Dwell on open answer
  try { await wait(1200); } catch (_) {}

  // 4. Click second question
  try {
    await page.getByRole('button').nth(1).click({ timeout: 2500 });
    await wait(600);
  } catch (_) {}

  // 5. Dwell
  try { await wait(1200); } catch (_) {}

  // 6. Click third question
  try {
    await page.getByRole('button').nth(2).click({ timeout: 2500 });
    await wait(600);
  } catch (_) {}

  // 7. Final dwell
  try { await wait(800); } catch (_) {}
}
