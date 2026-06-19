// ShimmerButton: a conic-gradient spark continuously rotates behind the button
// (animate-shimmer-slide + animate-spin-around, ~3s cycle). On hover the inset
// highlight brightens. Show: idle dwell to let the shimmer sweep across, hover
// to reveal the highlight glow, move away, repeat. No click needed — the
// signature effect is the perpetual shimmer + hover glow.
export default async function capture(page, { W, H, cfg, wait }) {
  const cx = Math.round(W / 2);
  const cy = Math.round(H / 2);

  // Park mouse off-button initially so the first dwell shows the base shimmer.
  try {
    await page.mouse.move(cx + 200, cy, { steps: 5 });
  } catch (_) {}

  // Let the shimmer complete roughly one full revolution (~3s) before hovering.
  await wait(3200);

  // Hover: ease in over the button.
  try {
    await page.mouse.move(cx, cy, { steps: 20 });
  } catch (_) {}

  // Dwell on hover — highlight brightens, shadow shifts.
  await wait(1400);

  // Move away to resting state.
  try {
    await page.mouse.move(cx + 200, cy + 80, { steps: 20 });
  } catch (_) {}

  // Brief idle before loop seam.
  await wait(600);

  // Second hover pass to show the effect once more.
  try {
    await page.mouse.move(cx, cy, { steps: 15 });
  } catch (_) {}

  await wait(1200);

  // Return to neutral.
  try {
    await page.mouse.move(cx - 200, cy - 80, { steps: 15 });
  } catch (_) {}

  await wait(500);
}
