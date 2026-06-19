// comp-114: Split primary button — "Fork 18" label with badge | chevron-down icon.
// Hover Fork label, click it (shows active), then hover chevron dropdown trigger.
export default async function capture(page, { W, H, wait }) {
  const cy = H / 2;
  // "Fork 18" is the wider left segment; chevron is the narrower right segment.
  const labelX = W / 2 - 35;
  const chevronX = W / 2 + 50;

  await wait(400);

  // Hover Fork label
  try {
    await page.mouse.move(labelX, cy, { steps: 14 });
  } catch (_) {}
  await wait(600);

  // Click Fork
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
