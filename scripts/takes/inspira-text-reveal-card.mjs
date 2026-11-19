// inspira-text-reveal-card — wipe the hidden line in from left to right
export default async (film) => {
  const card = film.page.locator("[data-rec-root] [class*='max-w-[640px]']").first();
  const b = await card.boundingBox();
  const y = b.y + b.height * 0.66;
  const l = b.x + 8, r = b.x + b.width - 8;
  await film.glide({ x: l, y }, { secs: 0.7 });
  await film.hold(250);
  await film.glide({ x: r, y }, { secs: 1.5 });
  await film.hold(400);
  film.mark("hero");
  await film.glide({ x: b.x + b.width * 0.45, y }, { secs: 0.9 });
  await film.hold(800);
};
