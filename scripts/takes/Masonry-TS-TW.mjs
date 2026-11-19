// Masonry: sweep the cursor across the tiles so each one scales and refocuses.
export default async (film) => {
  const tiles = film.page.locator("[data-key]");
  const n = await tiles.count();
  const order = [];
  for (let i = 0; i < Math.min(n, 8); i++) order.push(i);
  for (const i of order) {
    await film.glide(tiles.nth(i), { secs: 0.28 });
    await film.hold(240);
  }
  film.mark("hero");
  await film.glide(tiles.nth(0), { secs: 0.5 });
  await film.hold(400);
};
