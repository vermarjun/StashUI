/**
 * Choreography: dock (magic-ui)
 * The Dock renders a horizontal pill bar of 7 DockIcons that magnify on hover.
 * Uses onMouseMove(pageX) for distance calculation — sweep mouse slowly across.
 * Strategy: approach from left, sweep right across all 7 icons, exit, sweep back.
 */
export default async function capture(page, { W, H, cfg, wait }) {
  await wait(600);

  // Dock is centered horizontally and vertically in the demo.
  // 7 icons at 40px each + 6 gaps at 8px (gap-2) = 328px total.
  // Half-width: 164px. Icon centers (from dock center): -144, -96, -48, 0, +48, +96, +144
  const dockCenterX = Math.round(W / 2);
  const dockY = Math.round(H / 2);
  const spacing = 48; // ~icon width + gap
  const offsets = [-3, -2, -1, 0, 1, 2, 3].map((i) => i * spacing);
  const iconPositions = offsets.map((o) => dockCenterX + o);

  // Approach from left, outside the dock
  try {
    await page.mouse.move(dockCenterX - 280, dockY, { steps: 12 });
    await wait(200);
  } catch (_) {}

  // Sweep across each icon from left to right
  for (const x of iconPositions) {
    try {
      await page.mouse.move(x, dockY, { steps: 16 });
      await wait(400);
    } catch (_) {}
  }

  // Exit right
  try {
    await page.mouse.move(dockCenterX + 280, dockY, { steps: 12 });
    await wait(300);
  } catch (_) {}

  // Sweep back left, slower, to show the magnification wave again
  for (const x of [...iconPositions].reverse()) {
    try {
      await page.mouse.move(x, dockY, { steps: 14 });
      await wait(350);
    } catch (_) {}
  }

  // Move off-dock to return icons to rest
  try {
    await page.mouse.move(dockCenterX, dockY - 80, { steps: 18 });
    await wait(400);
  } catch (_) {}
}
