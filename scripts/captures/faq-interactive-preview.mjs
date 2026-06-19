/**
 * Choreography: faq-interactive-preview
 * Left column = FAQ list buttons (hover/click activates).
 * Right column = animated image + answer panel.
 * Hover/click through the questions to showcase the image transitions.
 */
export default async function capture(page, { W, H, wait }) {
  // 1. Mount settle
  try { await wait(800); } catch (_) {}

  const buttons = page.getByRole('button');

  // 2. Hover/click item 0 (default active)
  try {
    await buttons.nth(0).hover({ timeout: 2500 });
    await wait(700);
  } catch (_) {}

  // 3. Click item 1
  try {
    await buttons.nth(1).click({ timeout: 2500 });
    await wait(800);
  } catch (_) {}

  // 4. Dwell — image animates in
  try { await wait(1000); } catch (_) {}

  // 5. Click item 2
  try {
    await buttons.nth(2).click({ timeout: 2500 });
    await wait(800);
  } catch (_) {}

  // 6. Dwell
  try { await wait(1000); } catch (_) {}

  // 7. Click item 3
  try {
    await buttons.nth(3).click({ timeout: 2500 });
    await wait(700);
  } catch (_) {}

  // 8. Final dwell
  try { await wait(600); } catch (_) {}
}
