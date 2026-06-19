// inspira-rainbow-button: rotating rainbow gradient border + under-glow, always animating.
// Dwell ~3 s at rest to show the continuous sweep, then hover over the "Fast" button.
export default async function capture(page, { W, H, wait }) {
  // Dwell at rest — let the rainbow border cycle through its colours
  await wait(3000);

  // Hover over the "Fast (1 s)" button (second in the row)
  try {
    const btn = page.getByRole("button", { name: /fast/i });
    await btn.hover({ force: true });
  } catch (_) {
    try {
      await page.mouse.move(W * 0.38, H / 2, { steps: 16 });
    } catch (_2) {}
  }
  await wait(1200);

  // Hover the default-speed button for contrast
  try {
    const btn = page.getByRole("button", { name: /default speed/i });
    await btn.hover({ force: true });
  } catch (_) {
    try {
      await page.mouse.move(W * 0.2, H / 2, { steps: 16 });
    } catch (_2) {}
  }
  await wait(1000);

  // Move away — end in resting state for clean loop seam
  try {
    await page.mouse.move(W * 0.08, H * 0.08, { steps: 14 });
  } catch (_) {}
  await wait(700);
}
