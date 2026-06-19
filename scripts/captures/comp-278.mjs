/**
 * Choreography: comp-278
 * Static alert banner — error with bulleted list (password requirements).
 * Red-tinted border + text. Settle, hover alert, dwell.
 */
export default async function capture(page, { W, H, wait }) {
  // 1. Settle
  try { await wait(700); } catch (_) {}

  // 2. Move mouse to the center of the alert
  try {
    await page.mouse.move(W / 2, H / 2, { steps: 10 });
    await wait(400);
  } catch (_) {}

  // 3. Dwell to let the viewer read the list
  try { await wait(2500); } catch (_) {}

  // 4. Drift slightly upward toward the heading line
  try {
    await page.mouse.move(W / 2, H / 2 - 15, { steps: 8 });
    await wait(600);
  } catch (_) {}
}
