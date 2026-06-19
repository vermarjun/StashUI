// RippleButton: clicking injects a circular ripple that scales from 0 outward
// (animate-rippling, default 600ms). The signature effect is the ripple
// emanating from the click point. Show: hover briefly, click at center so
// the ripple fans out, dwell for it to fade, repeat twice.
export default async function capture(page, { W, H, cfg, wait }) {
  const cx = Math.round(W / 2);
  const cy = Math.round(H / 2);

  // Park mouse off the button initially.
  try {
    await page.mouse.move(cx + 200, cy + 100, { steps: 5 });
  } catch (_) {}

  await wait(400);

  // --- First ripple ---
  // Hover over the button.
  try {
    await page.mouse.move(cx, cy, { steps: 18 });
  } catch (_) {}

  await wait(300);

  // Click at center — ripple emanates from pointer position.
  try {
    await page.mouse.click(cx, cy);
  } catch (_) {}

  // Dwell while the ripple expands and fades (600ms animation + margin).
  await wait(900);

  // Move away briefly.
  try {
    await page.mouse.move(cx + 200, cy + 100, { steps: 12 });
  } catch (_) {}

  await wait(500);

  // --- Second ripple (slightly off-center for visual variety) ---
  try {
    await page.mouse.move(cx - 20, cy - 10, { steps: 16 });
  } catch (_) {}

  await wait(250);

  try {
    await page.mouse.click(cx - 20, cy - 10);
  } catch (_) {}

  await wait(900);

  // --- Third ripple ---
  try {
    await page.mouse.move(cx + 18, cy + 8, { steps: 14 });
  } catch (_) {}

  await wait(200);

  try {
    await page.mouse.click(cx + 18, cy + 8);
  } catch (_) {}

  await wait(900);

  // End near resting state (mouse away, no active ripple).
  try {
    await page.mouse.move(cx + 200, cy + 100, { steps: 14 });
  } catch (_) {}

  await wait(400);
}
