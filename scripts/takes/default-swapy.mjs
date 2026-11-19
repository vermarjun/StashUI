// swapy dashboard: drags one card onto another slot so they swap
export default async (film) => {
  const items = film.page.locator("[data-swapy-item]");
  const a = await items.nth(0).boundingBox();
  const b = await items.nth(1).boundingBox();
  await film.glide({ x: a.x + a.width / 2, y: a.y + a.height / 2 }, { secs: 0.7 });
  await film.page.mouse.down();
  await film.glide({ x: b.x + b.width / 2, y: b.y + b.height / 2 }, { secs: 1.1 });
  await film.hold(400);
  film.mark("hero");
  await film.page.mouse.up();
  await film.hold(1400);
};
