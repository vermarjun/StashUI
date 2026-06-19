// comp-111: Split primary button — QR-code icon segment | "Sign in" segment.
// Hover icon side, then hover label side and click.
export default async function capture(page, { W, H, wait }) {
  const cy = H / 2;
  // Icon button is on the left of the split, label button on the right.
  // Group is centred; icon segment is narrower (~36px), label wider (~80px).
  const iconX = W / 2 - 50;
  const labelX = W / 2 + 30;

  await wait(400);

  // Hover icon segment
  try {
    await page.mouse.move(iconX, cy, { steps: 14 });
  } catch (_) {}
  await wait(550);

  // Move to label segment
  try {
    await page.mouse.move(labelX, cy, { steps: 12 });
  } catch (_) {}
  await wait(500);

  // Click Sign in
  try {
    await page.mouse.down();
  } catch (_) {}
  await wait(180);
  try {
    await page.mouse.up();
  } catch (_) {}
  await wait(700);

  // Hover icon again briefly
  try {
    await page.mouse.move(iconX, cy, { steps: 12 });
  } catch (_) {}
  await wait(450);

  // Rest
  try {
    await page.mouse.move(W * 0.1, H * 0.1, { steps: 12 });
  } catch (_) {}
  await wait(450);
}
