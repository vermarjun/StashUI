// comp-253 — three thumbs: drag the top one down to 70% so all thumbs are close
export default async (film) => {
  const thumb = film.page.locator("[data-rec-root] [role=slider]").nth(2);
  const b = await thumb.boundingBox();
  const y = b.y + b.height / 2;
  await film.glide({ x: b.x + b.width / 2, y });
  await film.page.mouse.down();
  await film.glide({ x: b.x + b.width / 2 - 110, y }, { secs: 1 });
  await film.hold(400);
  film.mark("hero");
  await film.page.mouse.up();
  await film.hold(900);
};
