// hero-highlight: SINGLE-SCREEN hero with dot-grid background that highlights
// under the cursor (200px radial-gradient mask reveals coloured dots), plus
// a Highlight word that animates its background-size from 0→100%.
// Strategy: wait for the Highlight animation (~2.5s), then move the mouse
// slowly across the dot-grid to show the hover reveal effect.

export default async function capture(page, { W, H, cfg, wait }) {
  // Wait for the Highlight word animation (duration 2s + delay 0.5s)
  await wait(2600);

  const cx = W / 2;
  const cy = H / 2;

  // Sweep mouse slowly from left to right through the headline area
  try {
    await page.mouse.move(cx * 0.25, cy * 0.8, { steps: 20 });
  } catch (_) {}
  await wait(200);

  try {
    await page.mouse.move(cx * 1.6, cy * 0.9, { steps: 50 });
  } catch (_) {}
  await wait(300);

  // Drift down through the subtitle area
  try {
    await page.mouse.move(cx * 1.2, cy * 1.2, { steps: 30 });
  } catch (_) {}
  await wait(300);

  // Sweep back left
  try {
    await page.mouse.move(cx * 0.4, cy * 1.1, { steps: 40 });
  } catch (_) {}
  await wait(300);

  // Return to centre
  try {
    await page.mouse.move(cx, cy, { steps: 20 });
  } catch (_) {}
  await wait(500);
}
