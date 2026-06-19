// code-comparison (magic-ui): hover the left (before) panel to show focus blur effect,
// then hover the right (after) panel, then move to the VS badge in the center.
export default async function capture(page, { W, H, cfg, wait }) {
  // Wait for shiki async highlighting to resolve
  await wait(1200);

  // Hover over the LEFT (before) panel to reveal focus blur on non-focused lines
  try {
    const leftPanel = page.locator(".leftside").first();
    await leftPanel.hover({ timeout: 3000 });
    await wait(900);
  } catch (_) {
    try {
      await page.mouse.move(W * 0.27, H * 0.55, { steps: 14 });
      await wait(900);
    } catch (_2) {}
  }

  // Move to center VS badge briefly
  try {
    await page.mouse.move(W * 0.5, H * 0.5, { steps: 10 });
    await wait(400);
  } catch (_) {}

  // Hover over the RIGHT (after) panel
  try {
    const rightPanel = page.locator(".rightside").first();
    await rightPanel.hover({ timeout: 2000 });
    await wait(900);
  } catch (_) {
    try {
      await page.mouse.move(W * 0.73, H * 0.55, { steps: 14 });
      await wait(900);
    } catch (_2) {}
  }

  // Return to neutral center to close loop cleanly
  try {
    await page.mouse.move(W / 2, H / 2, { steps: 12 });
  } catch (_) {}
  await wait(300);
}
