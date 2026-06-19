// Vertical thumbnail + autostart slider (embla axis:'y', Autoplay delay 2000ms)
// Strategy: autoplay is already running (stopOnMouseEnter:false,
// stopOnInteraction:false), so we just dwell ~4 s and let it advance through
// slides automatically. Move the mouse to the centre so thumbnails are visible.
export default async function capture(page, { W, H, cfg, wait }) {
  // Let the page hydrate, images load, and autoplay kick in
  await wait(800);

  // Gently move the cursor to the carousel centre so it doesn't obscure the
  // thumbnail strip on the right
  try {
    await page.mouse.move(W * 0.4, H * 0.5, { steps: 8 });
  } catch (_) {}

  // Dwell while autoplay fires (2 s interval → expect ~2 advances in 4 s)
  await wait(2200);

  // Move cursor slightly toward the thumbnail strip to show hover state
  try {
    await page.mouse.move(W * 0.75, H * 0.5, { steps: 6 });
  } catch (_) {}

  await wait(1800);

  // Return to centre – loop seam
  try {
    await page.mouse.move(W * 0.5, H * 0.5, { steps: 6 });
  } catch (_) {}
  await wait(400);
}
