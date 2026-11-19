// reflective card: glide onto the card and wander so the metallic sheen and the (fake) webcam reflection shift.
// Needs the rig to launch Chrome with --use-fake-ui-for-media-stream --use-fake-device-for-media-stream
// so no camera-permission prompt appears in the clip.
export default async (film) => {
  await film.page.context().grantPermissions(["camera"]).catch(() => {});
  const card = film.page.getByText("ALEXANDER DOE").first();
  const b = await card.boundingBox();
  const cx = b.x + b.width / 2, cy = b.y - 60;
  await film.glide({ x: cx - 100, y: cy - 120 }, { secs: 0.8 });
  film.mark("hero");
  await film.drift({ secs: 4, cx, cy, rx: 130, ry: 190 });
};
