// pointer: hide the rig cursor and wander inside the zone so only the custom pointer label is seen following the mouse
export default async (film) => {
  const zone = film.page.getByText("Custom Pointer Zone").locator("xpath=../..");
  const b = await zone.boundingBox();
  const cx = b.x + b.width / 2, cy = b.y + b.height / 2;
  film.hideCursor();
  await film.glide({ x: cx - b.width * 0.25, y: cy - b.height * 0.2 }, { secs: 0.6 });
  film.mark("hero");
  await film.drift({ secs: 4.5, cx, cy, rx: b.width * 0.32, ry: b.height * 0.3 });
};
