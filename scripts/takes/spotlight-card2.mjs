// spotlight-card2 — sweep across the chat card so the cursor glow follows
export default async (film) => {
  const card = film.page.locator("[data-rec-root] [class*='bg-black']").first();
  const b = await card.boundingBox();
  const cx = b.x + b.width / 2, cy = b.y + b.height / 2;
  const rx = b.width * 0.35, ry = b.height * 0.3;
  await film.glide({ x: cx - rx, y: cy - ry }, { secs: 0.7 });
  await film.hold(250);
  await film.glide({ x: cx + rx, y: cy - ry }, { secs: 1.0 });
  await film.hold(300);
  film.mark("hero");
  await film.glide({ x: cx - rx, y: cy + ry }, { secs: 1.1 });
  await film.hold(900);
};
