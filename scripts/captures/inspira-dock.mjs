/**
 * Choreography: inspira-dock
 *
 * Component: registry/inspira-react/dock.tsx
 * Demo:      registry/inspira-react/dock.demo.tsx
 *
 * Horizontal dock: Home | Search | (separator) | Settings — 3 DockIcons.
 * Magnification uses `mouseX` via pageX: icons scale up as cursor passes
 * through a 140px distance window (default).
 * The dock is centered horizontally, ~mt-8 from top — roughly H * 0.28.
 *
 * Strategy: approach from left, slow sweep across all three icons, exit right,
 * reverse sweep, then park cursor above the dock.
 */
export default async function choreography(page, { W, H }) {
  const dockCenterX = Math.round(W / 2);
  // Demo has "p-8" wrapper + mt-8 on dock → dock top ≈ H * 0.25; icons center ≈ H * 0.28
  const dockY = Math.round(H * 0.30);
  // 3 icons at 40px + gap-4 (16px) ≈ 3*40 + 2*16 = 152px wide; half = 76px
  // With separator: Home at -76, Search at -28, (sep at 0), Settings at +42
  const iconXs = [
    dockCenterX - 76,
    dockCenterX - 28,
    dockCenterX + 48,
  ];

  // ── 1. Settle ─────────────────────────────────────────────────────────────
  try { await page.waitForTimeout(500); } catch (_) {}

  // ── 2. Approach from left ─────────────────────────────────────────────────
  try {
    await page.mouse.move(dockCenterX - 200, dockY, { steps: 12 });
    await page.waitForTimeout(200);
  } catch (_) {}

  // ── 3. Sweep left → right across all icons ────────────────────────────────
  for (const x of iconXs) {
    try {
      await page.mouse.move(x, dockY, { steps: 14 });
      await page.waitForTimeout(350);
    } catch (_) {}
  }

  // ── 4. Exit right ────────────────────────────────────────────────────────
  try {
    await page.mouse.move(dockCenterX + 200, dockY, { steps: 10 });
    await page.waitForTimeout(200);
  } catch (_) {}

  // ── 5. Reverse sweep right → left (slower for visual dwell) ──────────────
  for (const x of [...iconXs].reverse()) {
    try {
      await page.mouse.move(x, dockY, { steps: 16 });
      await page.waitForTimeout(320);
    } catch (_) {}
  }

  // ── 6. Linger on Home icon then move above dock ───────────────────────────
  try {
    await page.mouse.move(iconXs[0], dockY, { steps: 8 });
    await page.waitForTimeout(450);
    await page.mouse.move(dockCenterX, dockY - 90, { steps: 14 });
    await page.waitForTimeout(300);
  } catch (_) {}
}
