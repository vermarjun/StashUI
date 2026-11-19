// swapy-handle — grab a card by its handle and drop it on another slot
export default async (film) => {
  const handle = film.page.locator("[data-rec-root] [data-swapy-handle]").nth(4);
  const target = film.page.getByText(/Magical Moments/).first();
  const a = await handle.boundingBox();
  const b = await target.boundingBox();
  await film.glide({ x: a.x + a.width / 2, y: a.y + a.height / 2 }, { secs: 0.7 });
  await film.hold(250);
  await film.page.mouse.down();
  await film.glide({ x: b.x + b.width / 2, y: b.y + b.height / 2 }, { secs: 1.3 });
  await film.hold(500);
  film.mark("hero");
  await film.page.mouse.up();
  await film.hold(1400);
};
