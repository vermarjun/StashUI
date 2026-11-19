// drag the lower thumb of the vertical range slider up; tooltip shows the value
export default async (film) => {
  const thumb = film.page.locator("[data-rec-root] [role=slider]").first();
  const b = await thumb.boundingBox();
  const x = b.x + b.width / 2;
  const y = b.y + b.height / 2;
  await film.glide({ x, y }, { secs: 0.7 });
  await film.page.mouse.down();
  await film.hold(200);
  await film.glide({ x, y: y - 66 }, { secs: 1.2 });
  film.mark("hero");
  await film.hold(500);
  await film.glide({ x, y: y - 92 }, { secs: 0.7 });
  await film.page.mouse.up();
  await film.hold(1000);
};
