// spotlight-card — sweep the pointer across the card so the spotlight tracks it
export default async (film) => {
  const card = film.page.locator("[data-rec-root] [class*='max-w-xs']").first();
  const b = await card.boundingBox();
  const y = b.y + b.height * 0.5;
  await film.glide({ x: b.x + b.width * 0.15, y }, { secs: 0.7 });
  await film.hold(250);
  await film.glide({ x: b.x + b.width * 0.85, y }, { secs: 1.1 });
  await film.hold(400);
  film.mark("hero");
  await film.glide({ x: b.x + b.width * 0.3, y: b.y + b.height * 0.75 }, { secs: 0.9 });
  await film.hold(800);
};
