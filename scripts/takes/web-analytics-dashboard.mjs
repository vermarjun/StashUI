// web-analytics-dashboard — scrub the visitors chart tooltip, then scroll through the cards
export default async (film) => {
  const chart = film.page.locator("[data-rec-root] .recharts-wrapper").first();
  const box = await chart.boundingBox();
  if (box) {
    await film.glide({ x: box.x + box.width * 0.2, y: box.y + box.height * 0.5 }, { secs: 0.7 });
    await film.glide({ x: box.x + box.width * 0.82, y: box.y + box.height * 0.45 }, { secs: 1.6 });
    film.mark("hero");
    await film.hold(600);
  }
  await film.scroll(520, { secs: 1.6 });
  await film.hold(700);
};
