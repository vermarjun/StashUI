// scroll-index — scroll the article and watch the rail track it, then click a section tick to jump
export default async (film) => {
  const box = film.page.getByRole("region", { name: "Article" });
  const b = await box.boundingBox();
  await film.glide({ x: b.x + b.width * 0.45, y: b.y + b.height * 0.5 }, { secs: 0.6 });
  await film.scroll(700, { secs: 1.6 });
  await film.hold(500);
  const ticks = film.page.getByRole("navigation", { name: "Sections" }).getByRole("button");
  const n = await ticks.count();
  await film.hover(ticks.nth(Math.max(0, n - 2)), { hold: 900 });
  film.mark("hero");
  await film.click(null, { hold: 1300 });
};
