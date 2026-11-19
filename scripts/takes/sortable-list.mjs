// sortable-list — drag a task down the list, then mark one done and delete it
export default async (film) => {
  const src = film.page.getByText("Design system tokens").first();
  const dst = film.page.getByText("Write unit tests").first();
  const a = await src.boundingBox();
  const b = await dst.boundingBox();
  await film.glide({ x: a.x + 60, y: a.y + a.height / 2 }, { secs: 0.7 });
  await film.hold(250);
  await film.page.mouse.down();
  await film.glide({ x: b.x + 60, y: b.y + b.height / 2 + 30 }, { secs: 1.5 });
  await film.hold(400);
  await film.page.mouse.up();
  await film.hold(1200);
  await film.mark("hero");
  await film.click("#checkbox-5", { hold: 1400 });
  const trash = film.page.locator("[data-rec-root] button:has(svg.lucide-trash), [data-rec-root] button:has(svg.lucide-trash-2)").first();
  if (await trash.count()) await film.click(trash, { hold: 1300 });
};
