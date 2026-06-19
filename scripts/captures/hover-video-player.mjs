// hover-video-player: video plays on mouse-enter, pauses on mouse-leave.
// Choreography: move onto the player and dwell ~3s so the video starts and
// plays visibly, then move away (pause + thumbnail reappears), brief pause,
// then move back on to show the play cycle again before looping.
export default async function capture(page, { W, H, wait }) {
  // Let the component and thumbnail load
  await wait(900);

  // The demo wraps the player in max-w-md centred — target the centre of the
  // video area, which occupies roughly the middle 50% of the viewport width.
  const cx = Math.round(W / 2);
  const cy = Math.round(H / 2);

  // Start from a neutral position outside the player
  try {
    await page.mouse.move(Math.round(W * 0.1), Math.round(H * 0.1), { steps: 5 });
  } catch (_) {}

  await wait(300);

  // Glide onto the player — this fires onHoverStart which triggers playback
  try {
    await page.mouse.move(cx, cy, { steps: 20 });
  } catch (_) {}

  // Dwell ~3s: intersection observer fires, video loads and plays
  await wait(3200);

  // Move away from the player — onHoverEnd pauses it and restores thumbnail
  try {
    await page.mouse.move(Math.round(W * 0.9), Math.round(H * 0.15), { steps: 20 });
  } catch (_) {}

  // Brief pause so the thumbnail fade-in is captured
  await wait(900);

  // Move back onto the player for a second hover cycle (good loop seam)
  try {
    await page.mouse.move(cx, cy, { steps: 20 });
  } catch (_) {}

  await wait(1200);

  // Return to neutral position near the start for a clean loop
  try {
    await page.mouse.move(Math.round(W * 0.1), Math.round(H * 0.1), { steps: 10 });
  } catch (_) {}

  await wait(400);
}
