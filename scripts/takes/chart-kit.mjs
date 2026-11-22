// Chart kit: sweep across the bar chart (siblings dim, glass tooltip follows), then trace the price area
export default async (film) => {
  const bars = film.page.locator("[data-rec-root] .recharts-wrapper").nth(0);
  const area = film.page.locator("[data-rec-root] .recharts-wrapper").nth(1);
  const b = await bars.boundingBox();
  const a = await area.boundingBox();
  await film.glide({ x: b.x + b.width * 0.25, y: b.y + b.height * 0.6 }, { secs: 0.7 });
  await film.glide({ x: b.x + b.width * 0.75, y: b.y + b.height * 0.6 }, { secs: 1.4 });
  film.mark("hero");
  await film.hold(500);
  await film.glide({ x: a.x + a.width * 0.2, y: a.y + a.height * 0.5 }, { secs: 0.7 });
  await film.glide({ x: a.x + a.width * 0.85, y: a.y + a.height * 0.5 }, { secs: 1.6 });
};
