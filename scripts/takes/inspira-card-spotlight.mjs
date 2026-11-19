// inspira-card-spotlight — sweep the cursor across the first card, spotlight follows
export default async (film) => {
  const card = film.page.locator("[data-rec-root] .flex-wrap > div").first();
  const b = await card.boundingBox();
  const y = b.y + b.height * 0.45;
  await film.glide({ x: b.x + b.width * 0.12, y }, { secs: 0.6 });
  await film.hold(300);
  await film.glide({ x: b.x + b.width * 0.88, y }, { secs: 1.2 });
  await film.hold(400);
  film.mark("hero");
  await film.glide({ x: b.x + b.width * 0.3, y: b.y + b.height * 0.75 }, { secs: 1.1 });
  await film.hold(900);
};
