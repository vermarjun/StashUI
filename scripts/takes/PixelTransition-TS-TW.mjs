// PixelTransition — hover the photo: white pixels sweep in and dissolve into the trip details, then back
export default async (film) => {
  const card = film.page.locator("[data-rec-root] img").first();
  await film.hover(card, { hold: 1700 });
  film.mark("hero");
  await film.glide({ x: film.W * 0.85, y: film.H * 0.5 }, { secs: 0.7 });
  await film.hold(1300);
};
