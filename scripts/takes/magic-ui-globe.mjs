// Dotted cobe globe auto-rotates; grab and drag it to spin it by hand.
export default async (film) => {
  const c = await film.page.locator("canvas").first().boundingBox();
  const cx = c.x + c.width / 2;
  const cy = c.y + c.height * 0.4;
  await film.hold(1200);
  film.mark("hero");
  await film.glide({ x: cx - 120, y: cy }, { secs: 0.7 });
  await film.page.mouse.down();
  await film.glide({ x: cx + 180, y: cy + 10 }, { secs: 1.2 });
  await film.page.mouse.up();
  await film.hold(1600);
};
