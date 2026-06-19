/**
 * Choreography: dock (cult-ui)
 *
 * Component: registry/cult-ui/dock.tsx
 * Demo:      registry/cult-ui/dock.demo.tsx
 *
 * The Dock is pinned bottom-right (left: 3/4 transform -translate-x-1/2) of
 * its relative container. Icons magnify as the mouse sweeps across them.
 * 5 DockCards in two groups separated by a divider.
 */
export default async function choreography(page, { W, H }) {
  // Dock is positioned at left:75% of container — approx x = W * 0.75
  const dockCenterX = Math.round(W * 0.75);
  const dockY = Math.round(H * 0.82); // bottom-4 in a h-40 relative container
  const spacing = 52; // icon ~48px + gap-3

  // Icon x offsets for 5 icons (split by divider: 3 + divider + 2)
  const iconOffsets = [-108, -54, 0, 54, 108];

  // ── 1. Settle ─────────────────────────────────────────────────────────────
  try { await page.waitForTimeout(500); } catch (_) {}

  // ── 2. Approach from left ─────────────────────────────────────────────────
  try {
    await page.mouse.move(dockCenterX - 200, dockY, { steps: 12 });
    await page.waitForTimeout(250);
  } catch (_) {}

  // ── 3. Sweep left → right across all icons ────────────────────────────────
  for (const offset of iconOffsets) {
    try {
      await page.mouse.move(dockCenterX + offset, dockY, { steps: 10 });
      await page.waitForTimeout(300);
    } catch (_) {}
  }

  // ── 4. Exit right briefly ─────────────────────────────────────────────────
  try {
    await page.mouse.move(dockCenterX + 200, dockY, { steps: 10 });
    await page.waitForTimeout(200);
  } catch (_) {}

  // ── 5. Reverse sweep right → left (slower) ────────────────────────────────
  for (const offset of [...iconOffsets].reverse()) {
    try {
      await page.mouse.move(dockCenterX + offset, dockY, { steps: 12 });
      await page.waitForTimeout(280);
    } catch (_) {}
  }

  // ── 6. Click center icon to trigger bounce animation ──────────────────────
  try {
    await page.mouse.click(dockCenterX, dockY);
    await page.waitForTimeout(700);
  } catch (_) {}

  // ── 7. Return cursor above dock ───────────────────────────────────────────
  try {
    await page.mouse.move(dockCenterX, dockY - 100, { steps: 12 });
    await page.waitForTimeout(350);
  } catch (_) {}
}
