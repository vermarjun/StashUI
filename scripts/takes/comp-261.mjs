// push the vertical slider up, then settle it back a little
export default async (film) => {
  const thumb = film.page.locator("[data-rec-root] [role=slider]").first();
  const b = await thumb.boundingBox();
  const x = b.x + b.width / 2;
  const y = b.y + b.height / 2;
  await film.glide({ x, y }, { secs: 0.7 });
  await film.page.mouse.down();
  await film.hold(150);
  await film.glide({ x, y: y - 78 }, { secs: 1.1 });
  film.mark("hero");
  await film.hold(400);
  await film.glide({ x, y: y - 48 }, { secs: 0.7 });
  await film.page.mouse.up();
  await film.hold(1100);
};
