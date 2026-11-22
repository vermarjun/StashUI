// Pull the first letter out like a cradle ball and let go; the knock clacks through to the last letter.
export default async (film) => {
  const word = film.page.locator("[data-rec-root] .cursor-grab").first();
  const b = await word.boundingBox();
  const x = b.x + b.width * 0.16;
  const y = b.y + b.height * 0.62;
  await film.glide({ x, y }, { secs: 0.7 });
  await film.page.mouse.down();
  await film.glide({ x: x - 130, y: y - 50 }, { secs: 0.8 });
  await film.hold(250);
  await film.page.mouse.up();
  film.mark("hero");
  await film.hold(2200);
};
