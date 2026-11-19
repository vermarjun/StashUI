// spotlight-card1 — glide across the bento grid so each cell's spotlight lights up
export default async (film) => {
  const grid = film.page.locator("[data-rec-root] [class*='bg-black']").first();
  const b = await grid.boundingBox();
  const l = b.x + 30, r = b.x + b.width - 30;
  const t = b.y + b.height * 0.2, mid = b.y + b.height * 0.5, bt = b.y + b.height * 0.85;
  await film.glide({ x: l, y: t }, { secs: 0.7 });
  await film.hold(300);
  await film.glide({ x: r, y: t }, { secs: 1.1 });
  await film.glide({ x: l + 40, y: mid }, { secs: 1.0 });
  await film.hold(300);
  film.mark("hero");
  await film.glide({ x: r - 40, y: bt }, { secs: 1.0 });
  await film.hold(800);
};
