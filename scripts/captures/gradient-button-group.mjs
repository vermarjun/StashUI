// gradient-button-group: nav bar with 4 icon buttons + theme toggle.
// Hover across each button, click to change active selection (gold ring animates
// between items via layoutId spring), then loop back near the start.
export default async function capture(page, { W, H, wait }) {
  // Initial dwell — let the gold spinning ring render on the default active item
  await wait(800);

  // The nav group is centered; buttons are spaced ~76px apart, ~76px tall.
  // Approximate center of the nav at mid-height; buttons start around W*0.3.
  const navY = H / 2;
  const b1X = W * 0.34;
  const b2X = W * 0.44;
  const b3X = W * 0.54;
  const b4X = W * 0.64;

  // Hover first button (Dashboard — likely already active)
  try {
    await page.mouse.move(b1X, navY, { steps: 14 });
  } catch (_) {}
  await wait(500);

  // Click Analytics (2nd button) — gold ring slides right
  try {
    await page.mouse.move(b2X, navY, { steps: 12 });
  } catch (_) {}
  await wait(300);
  try {
    await page.mouse.click(b2X, navY);
  } catch (_) {}
  await wait(900);

  // Hover Layers (3rd button)
  try {
    await page.mouse.move(b3X, navY, { steps: 12 });
  } catch (_) {}
  await wait(300);

  // Click Layers
  try {
    await page.mouse.click(b3X, navY);
  } catch (_) {}
  await wait(900);

  // Click Storage (4th button) — gold ring slides to the far right
  try {
    await page.mouse.move(b4X, navY, { steps: 12 });
  } catch (_) {}
  await wait(300);
  try {
    await page.mouse.click(b4X, navY);
  } catch (_) {}
  await wait(900);

  // Click back to Dashboard (1st) — ring travels all the way left
  try {
    await page.mouse.move(b1X, navY, { steps: 16 });
  } catch (_) {}
  await wait(300);
  try {
    await page.mouse.click(b1X, navY);
  } catch (_) {}

  // Dwell on Dashboard so loop seam is back at starting state
  await wait(900);

  // Move away
  try {
    await page.mouse.move(W * 0.1, H * 0.1, { steps: 14 });
  } catch (_) {}
  await wait(600);
}
