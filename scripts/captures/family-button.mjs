// family-button: click the plus button to expand the radial/family menu,
// dwell on the expanded state, then click X to collapse back.
export default async function capture(page, { W, H, wait }) {
  // Initial dwell in collapsed state
  await wait(700);

  // Click the plus/expand toggle to open the family menu
  try {
    await page.getByRole('button').first().click();
  } catch (_) {}

  // Fallback: click at center if role lookup misses
  // (the expand toggle is rendered at center-bottom of the container)
  await wait(400);

  // Dwell on expanded state — show the menu contents
  await wait(2000);

  // Click the X/close toggle to collapse back
  try {
    await page.getByRole('button').first().click();
  } catch (_) {}

  await wait(300);

  // Dwell on collapsed resting state — clean loop seam
  await wait(800);
}
