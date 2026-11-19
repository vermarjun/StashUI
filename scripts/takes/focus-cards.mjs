// focus cards: hovers across the photos so the hovered one stays sharp, shows its title, and the rest blur
export default async (film) => {
  const cards = film.page.locator("[data-rec-root] img");
  await film.hover(cards.nth(0), { hold: 1200 });
  await film.hover(cards.nth(1), { hold: 1300 });
  film.mark("hero");
  await film.hover(cards.nth(2), { hold: 1200 });
};
