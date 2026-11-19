// spotlight-card3 — sweep the hover-focus spotlight across the growth card
export default async (film) => {
  const card = film.page.locator("[data-rec-root] [class*='bg-black']").first();
  const b = await card.boundingBox();
  const y = b.y + b.height * 0.45;
  await film.glide({ x: b.x + b.width * 0.2, y: y - 40 }, { secs: 0.7 });
  await film.hold(250);
  await film.glide({ x: b.x + b.width * 0.8, y: y - 40 }, { secs: 1.1 });
  await film.hold(300);
  film.mark("hero");
  await film.glide({ x: b.x + b.width * 0.3, y: y + 70 }, { secs: 1.0 });
  await film.hold(800);
};
