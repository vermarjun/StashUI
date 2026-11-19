// design-testimonials — glide across the quote for parallax, then advance twice
export default async (film) => {
  const box = film.page.locator("[data-rec-root] .max-w-5xl").first();
  const b = await box.boundingBox();
  await film.glide({ x: b.x + b.width * 0.2, y: b.y + b.height * 0.45 }, { secs: 0.7 });
  await film.glide({ x: b.x + b.width * 0.8, y: b.y + b.height * 0.5 }, { secs: 1.0 });
  await film.hold(500);
  const next = film.page.locator("[data-rec-root] button").nth(1);
  await film.click(next, { hold: 1400 });
  film.mark("hero");
  await film.click(next, { hold: 1400 });
};
