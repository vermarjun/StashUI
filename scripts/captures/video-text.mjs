// video-text: a video plays through an SVG text mask so the footage appears
// only within the letterforms. autoPlay=true muted=true, so it starts
// immediately. Dwell ~3 s to show the video content moving through the text.
export default async function capture(page, { W, H, wait }) {
  // Park mouse away from the text mask area.
  try {
    await page.mouse.move(Math.round(W * 0.5), Math.round(H * 0.08), { steps: 5 });
  } catch (_) {}

  // Allow the video element to load and begin auto-playing.
  try {
    await wait(800);
  } catch (_) {}

  // Dwell ~3 s — enough to see at least one distinct scene change or motion
  // pass through the text letterforms.
  try {
    await wait(3000);
  } catch (_) {}

  // Hold briefly on the current video frame for a clean loop seam.
  try {
    await wait(300);
  } catch (_) {}
}
