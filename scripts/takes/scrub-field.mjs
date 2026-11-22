// Drag a number chip sideways to scrub it, overshoot into the rubber band, then let go.
export default async (film) => {
  const chips = film.page.locator("[data-rec-root] [role=spinbutton]");
  const b = await chips.first().boundingBox();
  const y = b.y + b.height / 2;
  await film.glide({ x: b.x - 30, y });
  await film.page.mouse.down();
  await film.glide({ x: b.x + 160, y }, { secs: 1.1 });
  film.mark("hero");
  await film.glide({ x: b.x + 260, y }, { secs: 0.6 });
  await film.page.mouse.up();
  await film.hold(900);
  const b2 = await chips.nth(1).boundingBox();
  const y2 = b2.y + b2.height / 2;
  await film.glide({ x: b2.x - 30, y: y2 });
  await film.page.mouse.down();
  await film.glide({ x: b2.x - 160, y: y2 }, { secs: 0.9 });
  await film.page.mouse.up();
  await film.hold(800);
};
