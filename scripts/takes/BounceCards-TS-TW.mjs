// bounce cards: hovering one pushes its siblings aside
export default async (film) => {
  const cards = film.page.locator("[data-rec-root] .card");
  await film.hover(cards.nth(2), { hold: 1500 });
  film.mark("hero");
  await film.hover(cards.nth(3), { hold: 1300 });
};
