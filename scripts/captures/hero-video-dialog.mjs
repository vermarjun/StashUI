// hero-video-dialog: thumbnail with a play button that opens a lightbox dialog.
// Choreography: hover the thumbnail (zoom effect activates), click the play
// button to open the lightbox, dwell so the dialog animation completes, then
// click the backdrop to close before looping.
export default async function capture(page, { W, H, wait }) {
  // Let the thumbnail and play button render fully
  await wait(800);

  const cx = Math.round(W / 2);
  const cy = Math.round(H / 2);

  // Move onto the thumbnail to trigger the hover zoom + play-button scale
  try {
    await page.mouse.move(cx, cy, { steps: 10 });
  } catch (_) {}

  // Dwell so the hover animation is visible in the recording
  await wait(900);

  // Click the play button (centred on the thumbnail)
  try {
    await page.mouse.click(cx, cy);
  } catch (_) {}

  // Dwell so the spring-open dialog animation plays and the iframe appears
  await wait(2000);

  // Click the dark backdrop to close the dialog (top-left area, safely outside
  // the video panel which is centred and ~max-w-4xl)
  try {
    await page.mouse.click(Math.round(W * 0.05), Math.round(H * 0.08));
  } catch (_) {}

  // Wait for the exit animation to complete before the clip loops
  await wait(700);

  // Return near the play button centre so the loop seam is clean
  try {
    await page.mouse.move(cx, cy, { steps: 8 });
  } catch (_) {}

  await wait(400);
}
