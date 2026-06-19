// primitives-effects-image-zoom: ImageZoom zooms on mouseenter (zoomOnHover)
// and toggles on click (zoomOnClick). Move into the image to trigger zoom,
// dwell at zoom, move around to shift origin, then exit to un-zoom.
export default async function capture(page, { W, H, wait }) {
  const cx = Math.round(W * 0.5);
  const cy = Math.round(H * 0.5);

  // Let the component and image mount.
  try {
    await wait(600);
  } catch (_) {}

  // Park cursor outside the image (above it).
  try {
    await page.mouse.move(cx, Math.round(H * 0.2), { steps: 6 });
    await wait(300);
  } catch (_) {}

  // Enter the image from the top — triggers mouseenter → zoom in.
  try {
    await page.mouse.move(cx, Math.round(H * 0.38), { steps: 12 });
    await wait(200);
  } catch (_) {}

  // Move into the image center — spring settles.
  try {
    await page.mouse.move(cx, cy, { steps: 15 });
    await wait(800);
  } catch (_) {}

  // Pan the zoom origin: drift to upper-right corner of image.
  try {
    await page.mouse.move(Math.round(W * 0.62), Math.round(H * 0.38), { steps: 30 });
    await wait(600);
  } catch (_) {}

  // Pan to lower-left corner of image.
  try {
    await page.mouse.move(Math.round(W * 0.38), Math.round(H * 0.62), { steps: 35 });
    await wait(600);
  } catch (_) {}

  // Return to center.
  try {
    await page.mouse.move(cx, cy, { steps: 20 });
    await wait(500);
  } catch (_) {}

  // Exit the image (mouseLeave → zoom out).
  try {
    await page.mouse.move(cx, Math.round(H * 0.18), { steps: 15 });
    await wait(700);
  } catch (_) {}
}
