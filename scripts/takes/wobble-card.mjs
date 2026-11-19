// wobble-card — glide around the card so the 3D parallax rocks both layers
export default async (film) => {
  const card = film.page.locator("[data-rec-root] section").first();
  const b = await card.boundingBox();
  await film.glide({ x: b.x + b.width * 0.2, y: b.y + b.height * 0.3 }, { secs: 0.7 });
  await film.hold(250);
  await film.glide({ x: b.x + b.width * 0.8, y: b.y + b.height * 0.7 }, { secs: 1.1 });
  await film.hold(300);
  film.mark("hero");
  await film.glide({ x: b.x + b.width * 0.3, y: b.y + b.height * 0.65 }, { secs: 1.0 });
  await film.hold(700);
};
