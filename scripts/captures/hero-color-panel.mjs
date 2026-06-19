// hero-color-panel: SINGLE-SCREEN hero with an animated ColorPanels WebGL
// shader on the right (vibrant pink/green/lime/purple panels). The shader
// speed is 4 so it animates quickly. Settle ~1.5s then drift across content.

export default async function capture(page, { W, H, cfg, wait }) {
  // Settle: shader mount + first animation cycle
  await wait(1600);

  const cx = W / 2;
  const cy = H / 2;

  // Start at the heading area (left column)
  try {
    await page.mouse.move(cx * 0.25, cy * 0.75, { steps: 15 });
  } catch (_) {}
  await wait(350);

  // Sweep across heading text
  try {
    await page.mouse.move(cx * 0.75, cy * 0.85, { steps: 40 });
  } catch (_) {}
  await wait(350);

  // Move down toward CTA button
  try {
    await page.mouse.move(cx * 0.3, cy * 1.1, { steps: 25 });
  } catch (_) {}
  await wait(400);

  // Hover CTA then drift toward the colour shader panel
  try {
    await page.mouse.move(cx * 1.4, cy * 0.9, { steps: 45 });
  } catch (_) {}
  await wait(500);

  // Return toward centre
  try {
    await page.mouse.move(cx * 0.6, cy, { steps: 30 });
  } catch (_) {}
  await wait(400);
}
