// magic-card — sweep both cards so the gradient and the orb follow the cursor
export default async (film) => {
  const a = await film.page.locator("[data-rec-root] [class*='w-56']").first().boundingBox();
  await film.glide({ x: a.x + a.width * 0.2, y: a.y + a.height * 0.4 }, { secs: 0.7 });
  await film.hold(250);
  await film.glide({ x: a.x + a.width * 0.8, y: a.y + a.height * 0.6 }, { secs: 1.0 });
  await film.hold(500);
  film.mark("hero");
  const b = await film.page.locator("[data-rec-root] [class*='w-56']").nth(1).boundingBox();
  await film.glide({ x: b.x + b.width * 0.3, y: b.y + b.height * 0.5 }, { secs: 0.9 });
  await film.glide({ x: b.x + b.width * 0.75, y: b.y + b.height * 0.4 }, { secs: 0.8 });
  await film.hold(700);
};
