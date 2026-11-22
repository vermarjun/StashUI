// Holo Card: tilt across the card so the foil and glitter catch the light
export default async (film) => {
  const card = film.page.locator("[data-rec-root] canvas").first();
  const box = await card.boundingBox();
  await film.glide({ x: box.x + box.width * 0.2, y: box.y + box.height * 0.25 }, { secs: 0.8 });
  await film.glide({ x: box.x + box.width * 0.8, y: box.y + box.height * 0.7 }, { secs: 1.4 });
  film.mark("hero");
  await film.glide({ x: box.x + box.width * 0.75, y: box.y + box.height * 0.2 }, { secs: 1.0 });
  await film.glide({ x: box.x + box.width * 0.25, y: box.y + box.height * 0.75 }, { secs: 1.2 });
};
