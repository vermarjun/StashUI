// Hover the @mention and dwell on the profile hover card.
export default async (film) => {
  const link = film.page.locator("[data-rec-root] a").first();
  await film.hover(link, { hold: 2400 });
  film.mark("hero");
  await film.hold(600);
};
