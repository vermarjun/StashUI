// comp-113: Split primary button — chevron-down icon | "Pinned" label with pin icon.
// Hover label side and click, then hover chevron dropdown trigger.
export default async function capture(page, { W, H, wait }) {
  const cy = H / 2;
  // Chevron icon is the smaller left segment; "Pinned" is the wider right segment.
  const chevronX = W / 2 - 55;
  const labelX = W / 2 + 30;

  await wait(400);

  // Hover Pinned label
  try {
    await page.mouse.move(labelX, cy, { steps: 14 });
  } catch (_) {}
  await wait(550);

  // Click Pinned
  try {
    await page.mouse.down();
  } catch (_) {}
  await wait(180);
  try {
    await page.mouse.up();
  } catch (_) {}
  await wait(650);

  // Hover chevron trigger
  try {
    await page.mouse.move(chevronX, cy, { steps: 12 });
  } catch (_) {}
  await wait(550);

  // Click chevron
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
