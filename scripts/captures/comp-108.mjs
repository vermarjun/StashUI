// comp-108: 3-button outline group — Files | Media | ⋯ (ellipsis icon)
// Hover each segment in sequence, click one, then rest.
export default async function capture(page, { W, H, wait }) {
  // Approximate centre-x positions for 3 equal segments in the group
  const segW = W * 0.12; // rough width each button occupies relative to canvas
  const cy = H / 2;

  // Segment centres (group is centred, ~3 buttons ~120px wide total)
  const btn1X = W / 2 - segW;
  const btn2X = W / 2;
  const btn3X = W / 2 + segW * 0.9;

  // Initial dwell at rest
  await wait(400);

  // Hover first button (Files)
  try {
    await page.mouse.move(btn1X, cy, { steps: 14 });
  } catch (_) {}
  await wait(500);

  // Hover second button (Media)
  try {
    await page.mouse.move(btn2X, cy, { steps: 12 });
  } catch (_) {}
  await wait(500);

  // Click Media
  try {
    await page.mouse.down();
  } catch (_) {}
  await wait(160);
  try {
    await page.mouse.up();
  } catch (_) {}
  await wait(400);

  // Hover ellipsis button
  try {
    await page.mouse.move(btn3X, cy, { steps: 12 });
  } catch (_) {}
  await wait(500);

  // Click ellipsis
  try {
    await page.mouse.down();
  } catch (_) {}
  await wait(160);
  try {
    await page.mouse.up();
  } catch (_) {}
  await wait(400);

  // Return to rest
  try {
    await page.mouse.move(W * 0.1, H * 0.1, { steps: 12 });
  } catch (_) {}
  await wait(500);
}
