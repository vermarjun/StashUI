// inspira-shimmer-button: white/coloured shimmer sweeps back and forth continuously.
// Dwell ~3 s to show the sweep cycle, hover to reveal the inner-glow intensification.
export default async function capture(page, { W, H, wait }) {
  // Dwell at rest — let the shimmer sweep complete at least one full pass
  await wait(3000);

  // Hover over the first button ("Shimmer Button")
  try {
    const btn = page.getByRole("button", { name: /shimmer button/i });
    await btn.hover({ force: true });
  } catch (_) {
    try {
      await page.mouse.move(W * 0.35, H / 2, { steps: 18 });
    } catch (_2) {}
  }
  await wait(1200);

  // Move away — inner glow resets
  try {
    await page.mouse.move(W * 0.08, H * 0.08, { steps: 14 });
  } catch (_) {}
  await wait(600);

  // Hover over the "Purple Shimmer" button
  try {
    const btn2 = page.getByRole("button", { name: /purple shimmer/i });
    await btn2.hover({ force: true });
  } catch (_) {
    try {
      await page.mouse.move(W * 0.65, H / 2, { steps: 18 });
    } catch (_2) {}
  }
  await wait(1000);

  // Return to resting state for a clean loop seam
  try {
    await page.mouse.move(W * 0.08, H * 0.08, { steps: 14 });
  } catch (_) {}
  await wait(700);
}
