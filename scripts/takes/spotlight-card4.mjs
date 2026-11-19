// spotlight-card4 — approach and cross the card so the proximity glow fades in
export default async (film) => {
  const card = film.page.locator("[data-rec-root] [class*='bg-black']").first();
  const b = await card.boundingBox();
  await film.glide({ x: b.x - 60, y: b.y + b.height * 0.3 }, { secs: 0.7 });
  await film.hold(300);
  await film.glide({ x: b.x + b.width * 0.8, y: b.y + b.height * 0.55 }, { secs: 1.3 });
  await film.hold(500);
  film.mark("hero");
  await film.glide({ x: b.x + b.width * 0.25, y: b.y + b.height * 0.7 }, { secs: 1.0 });
  await film.hold(800);
};
