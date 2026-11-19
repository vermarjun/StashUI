// spring calendar: switches days, the event list morphs in
export default async (film) => {
  const cards = film.page.locator("[data-rec-root] button");
  await film.click(cards.filter({ hasText: "13" }).first(), { hold: 1600 });
  film.mark("hero");
  await film.click(cards.filter({ hasText: "9" }).first(), { hold: 1400 });
};
