// Lift the Revenue widget by its handle and drop it where Active users sits; the grid springs around it.
export default async (film) => {
  const handle = film.page.locator('[data-rec-root] [aria-label^="Move Revenue"]');
  const target = film.page.locator('[data-rec-root] [aria-label^="Move Active users"]');
  const h = await handle.boundingBox();
  const t = await target.boundingBox();
  await film.glide({ x: h.x + h.width / 2, y: h.y + h.height / 2 }, { secs: 0.7 });
  await film.page.mouse.down();
  await film.hold(250);
  await film.glide({ x: t.x - 40, y: t.y + 60 }, { secs: 1.0 });
  film.mark("hero");
  await film.hold(400);
  await film.page.mouse.up();
  await film.hold(1300);
};
