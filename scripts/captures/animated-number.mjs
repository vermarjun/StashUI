// AnimatedNumber (cult-ui): interactive — starts at 1234, buttons change value.
// Click through a few targets so the spring animation is clearly visible,
// then return to the starting value (1234) so the clip loops cleanly.
export default async function capture(page, { wait }) {
  // Brief initial dwell so the starting state is visible
  await wait(600);

  // Click 42,000 — big upward spring animation
  try {
    await page.getByRole('button', { name: '42,000' }).click();
  } catch (_) {}
  await wait(1200);

  // Click 0 — dramatic drop
  try {
    await page.getByRole('button', { name: '0' }).click();
  } catch (_) {}
  await wait(1000);

  // Click 999
  try {
    await page.getByRole('button', { name: '999' }).click();
  } catch (_) {}
  await wait(900);

  // Return to starting value (1,234) — loop seam
  try {
    await page.getByRole('button', { name: '1,234' }).click();
  } catch (_) {}
  await wait(800);
}
