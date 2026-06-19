// blur-vignette-video: same shared source as video-blur-vignette — an
// autoplaying looping video with a blurred vignette edge (BlurVignette wrapper).
// Choreography: dwell ~3s so the video is clearly playing, pan mouse along the
// vignette edge to highlight the blur effect, then return to centre.
export default async function capture(page, { W, H, wait }) {
  // Allow autoplay video to start and vignette CSS to settle
  await wait(1200);

  const cx = Math.round(W / 2);
  const cy = Math.round(H / 2);

  // Start near the top vignette edge to show the blur transition
  try {
    await page.mouse.move(cx, Math.round(H * 0.08), { steps: 10 });
  } catch (_) {}

  await wait(600);

  // Slowly sweep down through the vignette into the clear centre
  try {
    await page.mouse.move(cx, cy, { steps: 20 });
  } catch (_) {}

  // Dwell so the looping video plays visibly through the vignette effect
  await wait(3000);

  // Pan to the right vignette edge
  try {
    await page.mouse.move(Math.round(W * 0.92), cy, { steps: 15 });
  } catch (_) {}

  await wait(600);

  // Return to centre for a clean loop seam
  try {
    await page.mouse.move(cx, cy, { steps: 12 });
  } catch (_) {}

  await wait(500);
}
