// drag-items — grabbing the reorder handle and dragging a row down
export default async (film) => {
  const handle = film.page.locator("[data-rec-root] button[aria-label='Reorder']").first();
  const b = await handle.boundingBox();
  const x = b.x + b.width / 2;
  const y = b.y + b.height / 2;
  await film.glide({ x, y }, { secs: 0.8 });
  await film.page.mouse.down();
  await film.glide({ x, y: y + 170 }, { secs: 1.1 });
  await film.hold(400);
  film.mark("hero");
  await film.page.mouse.up();
  await film.hold(1300);
};
