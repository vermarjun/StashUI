// blur vignette card: hover each card so its frosted, vignette-blurred caption slides up over the art
export default async (film) => {
  const cards = film.page.locator("[data-rec-root] img");
  await film.hover(cards.nth(0), { hold: 1600 });
  film.mark("hero");
  await film.hover(cards.nth(1), { hold: 1600 });
  await film.glide({ x: film.W * 0.5, y: film.H * 0.9 }, { secs: 0.7 });
  await film.hold(600);
};
