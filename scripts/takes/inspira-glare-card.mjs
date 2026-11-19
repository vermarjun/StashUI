// inspira-glare-card — sweep the holographic card so the foil tilts, then let it rest
export default async (film) => {
  const card = film.page.locator("[data-rec-root] [class*='aspect-[17/21]']").first();
  const b = await card.boundingBox();
  const cx = b.x + b.width / 2, cy = b.y + b.height / 2;
  await film.glide({ x: cx, y: cy }, { secs: 0.7 });
  await film.hold(300);
  await film.glide({ x: b.x + b.width * 0.78, y: b.y + b.height * 0.3 }, { secs: 0.9 });
  film.mark("hero");
  await film.glide({ x: b.x + b.width * 0.25, y: b.y + b.height * 0.7 }, { secs: 0.9 });
  await film.hold(500);
  await film.glide({ x: b.x - 80, y: cy }, { secs: 0.7 });
  await film.hold(900);
};
