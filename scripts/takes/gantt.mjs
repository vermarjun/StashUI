// Gantt: drag a feature bar along the timeline; the sidebar duration updates
export default async (film) => {
  const bar = film.page.locator("[data-rec-root] .gantt").getByText("Billing API v2").last();
  const box = await bar.boundingBox();
  const start = { x: box.x + box.width / 2, y: box.y + box.height / 2 };
  await film.glide(start, { secs: 0.7 });
  await film.page.mouse.down();
  for (let i = 1; i <= 24; i++) {
    await film.page.mouse.move(start.x + i * 7, start.y);
    await film.hold(30);
  }
  film.mark("hero");
  await film.hold(400);
  await film.page.mouse.up();
  await film.hold(900);
};
