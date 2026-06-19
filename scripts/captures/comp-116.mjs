// comp-116: Single primary button "Next" with right-panel chevron accent.
// Hover then click to show active state; return to rest.
export default async function capture(page, { W, H, wait }) {
  const cx = W / 2;
  const cy = H / 2;

  await wait(500);

  // Hover the button
  try {
    await page.mouse.move(cx, cy, { steps: 16 });
  } catch (_) {}
  await wait(800);

  // Click (press state)
  try {
    await page.mouse.down();
  } catch (_) {}
  await wait(180);
  try {
    await page.mouse.up();
  } catch (_) {}
  await wait(700);

  // Hover the right accent panel specifically
  try {
    await page.mouse.move(cx + 55, cy, { steps: 12 });
  } catch (_) {}
  await wait(600);

  // Move away to rest
  try {
    await page.mouse.move(W * 0.1, H * 0.1, { steps: 12 });
  } catch (_) {}
  await wait(500);
}
