// Choreography for symbolic-clippath (clip-path-symbolic)
// A 3×2 grid of colored cards, each containing an image clipped by a geometric/
// symbolic SVG shape (star, diamond, half-round, wedge, tab, half-circle).
// Cards have a hover:p-4 transition (padding shrinks, image appears to grow).
// Strategy: hover each card in a Z-pattern to trigger the padding animation,
// dwell on each ~0.5s, then return to center.

export default async function capture(page, { W, H, cfg, wait }) {
  try {
    await page.locator('figure').first().waitFor({ state: 'visible', timeout: 6000 });
  } catch (_) {}

  await wait(500);

  // Card centers (3 cols × 2 rows), approximate grid positions
  const cols = [0.18, 0.50, 0.82];
  const rows = [0.30, 0.72];

  // Z-pattern: row 0 left→right, then row 1 right→left
  const sequence = [
    [cols[0], rows[0]],
    [cols[1], rows[0]],
    [cols[2], rows[0]],
    [cols[2], rows[1]],
    [cols[1], rows[1]],
    [cols[0], rows[1]],
  ];

  for (const [cx, cy] of sequence) {
    try {
      await page.mouse.move(W * cx, H * cy, { steps: 14 });
    } catch (_) {}
    await wait(480);
  }

  // Final dwell at center
  try {
    await page.mouse.move(W * 0.5, H * 0.5, { steps: 12 });
  } catch (_) {}
  await wait(700);
}
