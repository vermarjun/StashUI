// ui-layouts-3d-marquee: a single vertical marquee column rendered with a CSS
// 3-D perspective transform (rotateY −20 deg, rotateZ 10 deg, scale 1.5).
// Images scroll upward in a tilt. No user interaction needed — dwell ~3.5 s.
export default async function capture(page, { W, H, cfg, wait }) {
  // Let images start loading and CSS transform settle.
  try { await wait(600); } catch (_) {}

  // Park mouse away from the column to avoid hover ring on images.
  try {
    await page.mouse.move(Math.round(W * 0.1), Math.round(H * 0.1), { steps: 5 });
  } catch (_) {}

  // Dwell ~3.5 s — marquee duration is 60 s, so 3.5 s shows ~6 % scroll,
  // clearly visible against the perspective tilt.
  try { await wait(3500); } catch (_) {}

  // No further interaction.
  try { await wait(200); } catch (_) {}
}
