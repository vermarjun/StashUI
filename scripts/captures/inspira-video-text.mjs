// inspira-video-text: large bold "HELLO" text acts as a clipping mask for a
// space/stars video that autoplays muted on a black background. No interaction
// drives the effect — the video plays through the letterforms continuously.
// Choreography: dwell ~3 s to let the looping video show through the text mask.
export default async function capture(page, { W, H, wait }) {
  // Park mouse at bottom-right — well away from the centred text, no occlusion.
  try {
    await page.mouse.move(Math.round(W * 0.92), Math.round(H * 0.88), { steps: 5 });
  } catch (_) {}

  // Allow video to load, autoplay to start, and first frames to render.
  try { await wait(800); } catch (_) {}

  // Dwell — 3 s captures multiple seconds of video motion through the letterforms.
  try { await wait(3000); } catch (_) {}

  // Brief final pause before capture ends.
  try { await wait(200); } catch (_) {}
}
