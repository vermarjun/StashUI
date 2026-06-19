/**
 * Choreography: Dock-TS-TW
 *
 * DOCK type: move mouse slowly across the dock icons to trigger magnification.
 * Dock is pinned to the bottom-center of the container.
 */
export default async function capture(page, { W, H, wait }) {
  const cx = Math.round(W / 2);
  const dockY = Math.round(H * 0.82); // dock sits near bottom

  // 1. Mount settle
  try { await wait(600); } catch (_) {}

  // 2. Approach dock from left
  try {
    await page.mouse.move(cx - 220, dockY, { steps: 10 });
    await wait(300);
  } catch (_) {}

  // 3. Sweep left→right across all 5 icons (approx 50px apart)
  const iconOffsets = [-100, -50, 0, 50, 100];
  for (const offset of iconOffsets) {
    try {
      await page.mouse.move(cx + offset, dockY, { steps: 8 });
      await wait(280);
    } catch (_) {}
  }

  // 4. Reverse sweep right→left (slow)
  for (const offset of [...iconOffsets].reverse()) {
    try {
      await page.mouse.move(cx + offset, dockY, { steps: 10 });
      await wait(250);
    } catch (_) {}
  }

  // 5. Hover center icon (index 2) and pause
  try {
    await page.mouse.move(cx, dockY, { steps: 6 });
    await wait(600);
  } catch (_) {}

  // 6. Return above dock — ends near same place
  try {
    await page.mouse.move(cx, dockY - 120, { steps: 10 });
    await wait(300);
  } catch (_) {}
}
