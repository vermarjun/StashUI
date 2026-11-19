// comp-256 — satisfaction slider: drag from Okay to Amazing and read the label
export default async (film) => {
  const thumb = film.page.locator("[data-rec-root] [role=slider]").first();
  const b = await thumb.boundingBox();
  const y = b.y + b.height / 2;
  await film.glide({ x: b.x + b.width / 2, y });
  await film.page.mouse.down();
  await film.glide({ x: b.x + b.width / 2 + 130, y }, { secs: 1 });
  await film.page.mouse.up();
  await film.hold(900);
  film.mark("hero");
  await film.hold(900);
};
