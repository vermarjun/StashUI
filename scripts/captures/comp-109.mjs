// comp-109: ToggleGroup (Left | Center | Right), single-select outline variant.
// Cycle through each option so viewers see the active highlight move.
export default async function capture(page, { W, H, wait }) {
  const cy = H / 2;
  // Three toggle items centred; approximate x offsets relative to canvas centre
  const leftX = W / 2 - 80;
  const centerX = W / 2;
  const rightX = W / 2 + 80;

  await wait(400);

  // Hover Left item
  try {
    await page.mouse.move(leftX, cy, { steps: 14 });
  } catch (_) {}
  await wait(400);

  // Click Left — activates it
  try {
    await page.mouse.down();
  } catch (_) {}
  await wait(160);
  try {
    await page.mouse.up();
  } catch (_) {}
  await wait(600);

  // Hover Center
  try {
    await page.mouse.move(centerX, cy, { steps: 12 });
  } catch (_) {}
  await wait(350);

  // Click Center — active moves
  try {
    await page.mouse.down();
  } catch (_) {}
  await wait(160);
  try {
    await page.mouse.up();
  } catch (_) {}
  await wait(600);

  // Hover Right
  try {
    await page.mouse.move(rightX, cy, { steps: 12 });
  } catch (_) {}
  await wait(350);

  // Click Right — active moves again
  try {
    await page.mouse.down();
  } catch (_) {}
  await wait(160);
  try {
    await page.mouse.up();
  } catch (_) {}
  await wait(600);

  // Return to rest (no selection cancelled — leave Right active for clean loop)
  try {
    await page.mouse.move(W * 0.1, H * 0.1, { steps: 12 });
  } catch (_) {}
  await wait(400);
}
