// Let the labelled pills drop and pile up, then grab one and throw it back across the hero.
export default async (film) => {
  await film.hold(1600);
  const pill = film.page.locator("[data-rec-root] [data-shape]", { hasText: "Wheel Picker" }).first();
  const b = await pill.boundingBox();
  await film.glide({ x: b.x + b.width / 2, y: b.y + b.height / 2 }, { secs: 0.7 });
  await film.page.mouse.down();
  await film.glide({ x: film.W * 0.5, y: film.H * 0.38 }, { secs: 0.45 });
  await film.page.mouse.up();
  film.mark("hero");
  await film.hold(1500);
};
