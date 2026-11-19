// creative hover cards: hovers the cards so the alt images and copy swap in
export default async (film) => {
  const cards = film.page.locator("[data-rec-root] .group");
  await film.hover(cards.nth(0), { hold: 1400 });
  film.mark("hero");
  await film.hover(cards.nth(1), { hold: 1400 });
};
