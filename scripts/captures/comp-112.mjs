// comp-112: Split outline button — "Preview" label | external-link icon segment.
// Hover label, click it, then hover icon segment.
export default async function capture(page, { W, H, wait }) {
  const cy = H / 2;
  // "Preview" is the wider left segment; icon is the narrower right segment.
  const labelX = W / 2 - 30;
  const iconX = W / 2 + 55;

  await wait(400);

  // Hover Preview label
  try {
    await page.mouse.move(labelX, cy, { steps: 14 });
  } catch (_) {}
  await wait(550);

  // Click Preview
  try {
    await page.mouse.down();
  } catch (_) {}
  await wait(180);
  try {
    await page.mouse.up();
  } catch (_) {}
  await wait(600);

  // Move to icon segment
  try {
    await page.mouse.move(iconX, cy, { steps: 12 });
  } catch (_) {}
  await wait(550);

  // Click icon segment
  try {
    await page.mouse.down();
  } catch (_) {}
  await wait(180);
  try {
    await page.mouse.up();
  } catch (_) {}
  await wait(500);

  // Rest
  try {
    await page.mouse.move(W * 0.1, H * 0.1, { steps: 12 });
  } catch (_) {}
  await wait(450);
}
