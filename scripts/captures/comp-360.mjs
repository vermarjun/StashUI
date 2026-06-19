/**
 * Capture choreography for comp-360
 * A directional pad (D-pad) of 4 icon buttons (Up/Left/Right/Down) each with
 * a tooltip showing the pan direction + keyboard shortcut.
 * Sequence: hover Up → dwell 1.5s → hover Left → dwell 1.5s →
 *           hover Right → dwell 1.5s → hover Down → dwell 1.5s → move away.
 */
export default async function capture(page, { W, H, wait }) {
  const cx = W / 2;
  const cy = H / 2;

  await wait(400);

  const directions = [
    { name: /pan camera up/i, label: "up" },
    { name: /pan camera left/i, label: "left" },
    { name: /pan camera right/i, label: "right" },
    { name: /pan camera down/i, label: "down" },
  ];

  for (const { name, label } of directions) {
    try {
      const btn = page.getByRole("button", { name });
      await btn.waitFor({ state: "visible", timeout: 2000 });
      await btn.hover();
      // Dwell so tooltip with kbd shortcut is clearly visible
      await wait(1500);
    } catch (err) {
      try {
        // Fallback: move mouse toward center and wait
        await page.mouse.move(cx, cy, { steps: 8 });
        await wait(800);
      } catch (_) {}
    }
  }

  // Move away to dismiss last tooltip
  try {
    await page.mouse.move(cx + 120, cy - 90, { steps: 12 });
    await wait(500);
  } catch (_) {}

  // End near start
  try {
    await page.mouse.move(cx, cy, { steps: 8 });
    await wait(300);
  } catch (_) {}
}
