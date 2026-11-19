// Raw color picker: drag the marker across the colour panel, then the hue slider
export default async (film) => {
  const panel = await film.page
    .locator("[data-rec-root] .space-y-4 > div")
    .first()
    .boundingBox();
  await film.glide({ x: panel.x + panel.width * 0.2, y: panel.y + panel.height * 0.3 }, { secs: 0.5 });
  await film.page.mouse.down();
  await film.glide({ x: panel.x + panel.width * 0.72, y: panel.y + panel.height * 0.6 }, { secs: 0.9 });
  await film.page.mouse.up();
  await film.hold(500);
  const hue = await film.page
    .locator("[data-rec-root] .space-y-4 > div")
    .nth(1)
    .boundingBox();
  await film.glide({ x: hue.x + hue.width * 0.66, y: hue.y + hue.height / 2 }, { secs: 0.6 });
  await film.page.mouse.down();
  await film.page.mouse.up();
  await film.hold(700);
  film.mark("hero");
  await film.hold(700);
};
