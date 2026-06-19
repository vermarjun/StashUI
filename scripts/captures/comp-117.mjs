// comp-117: Outline button "Like 86" — thumbs-up icon + count separator badge.
// Hover to show hover ring, click to show active, return to rest.
export default async function capture(page, { W, H, wait }) {
  const cx = W / 2;
  const cy = H / 2;

  await wait(500);

  // Hover the button
  try {
    await page.mouse.move(cx, cy, { steps: 16 });
  } catch (_) {}
  await wait(900);

  // Click
  try {
    await page.mouse.down();
  } catch (_) {}
  await wait(180);
  try {
    await page.mouse.up();
  } catch (_) {}
  await wait(800);

  // Hover the count badge side
  try {
    await page.mouse.move(cx + 38, cy, { steps: 12 });
  } catch (_) {}
  await wait(600);

  // Move away to rest
  try {
    await page.mouse.move(W * 0.1, H * 0.1, { steps: 12 });
  } catch (_) {}
  await wait(500);
}
