// hero-share-app — SINGLE-SCREEN app-launch hero (red-50 bg, radial gradient)
// Three floating photo cards fan out at the bottom (rotate ±15deg).
// TimelineAnimation stagger reveals on mount (animationNum 0-11).
// Strategy: dwell for stagger-in → hover "Download for App Store" CTA →
// drift toward the centre card → hover the left rotated card.

export default async function capture(page, { W, H, cfg, wait }) {
  // Let stagger-in animations finish (~12 items)
  await wait(1400);

  const cx = W / 2;

  // Hover the "Download for App Store" button (left of centre, ~45% y)
  try {
    await page.mouse.move(Math.round(W * 0.38), Math.round(H * 0.72), { steps: 25 });
  } catch (_) {}
  await wait(700);

  // Drift to "Download from Play Store" button
  try {
    await page.mouse.move(Math.round(W * 0.56), Math.round(H * 0.72), { steps: 20 });
  } catch (_) {}
  await wait(600);

  // Drift down toward the centre floating card (below CTA row)
  try {
    await page.mouse.move(cx, Math.round(H * 0.88), { steps: 30 });
  } catch (_) {}
  await wait(500);

  // Hover over the left rotated card
  try {
    await page.mouse.move(Math.round(W * 0.18), Math.round(H * 0.85), { steps: 25 });
  } catch (_) {}
  await wait(500);

  // Return to headline area
  try {
    await page.mouse.move(cx, Math.round(H * 0.35), { steps: 30 });
  } catch (_) {}
  await wait(400);
}
