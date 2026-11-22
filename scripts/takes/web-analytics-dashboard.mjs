// web-analytics-dashboard — scrub the visitors chart tooltip across the year, then scroll to the cards
export default async (film) => {
  const chart = film.page.locator("[data-rec-root] .recharts-wrapper").first();
  const box = await chart.boundingBox();
  await film.glide({ x: box.x + box.width * 0.15, y: box.y + box.height * 0.5 }, { secs: 0.7 });
  await film.glide({ x: box.x + box.width * 0.88, y: box.y + box.height * 0.45 }, { secs: 1.8 });
  film.mark("hero");
  await film.hold(500);
  await film.scroll(480, { secs: 1.5, hold: 700 });
};
