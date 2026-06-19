// video-blur-vignette: a video that autoplays, looping, with a blurred vignette
// edge effect applied via BlurVignette. Choreography: dwell ~3s so the looping
// video is clearly playing behind the vignette overlay, then optionally trigger
// the hover-scale on the video element before settling back.
export default async function capture(page, { W, H, wait }) {
  // Give the autoplay video time to start and the vignette to render
  await wait(1200);

  const cx = Math.round(W / 2);
  const cy = Math.round(H / 2);

  // Move onto the video area — it has a hover:scale-110 transition
  try {
    await page.mouse.move(cx, cy, { steps: 12 });
  } catch (_) {}

  // Dwell so the looping video plays visibly through the vignette
  await wait(3000);

  // Move slightly to the edge so the vignette blur is prominent in frame
  try {
    await page.mouse.move(Math.round(W * 0.2), Math.round(H * 0.5), { steps: 12 });
  } catch (_) {}

  await wait(800);

  // Return to centre for a clean loop seam
  try {
    await page.mouse.move(cx, cy, { steps: 10 });
  } catch (_) {}

  await wait(500);
}
