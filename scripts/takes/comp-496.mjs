// right-aligned navigation: steps two months forward, then picks a day
export default async (film) => {
  const next = film.page.locator("[data-rec-root] .rdp-button_next");
  await film.click(next, { hold: 1100 });
  film.mark("hero");
  await film.click(next, { hold: 1000 });
  await film.click(film.page.locator("[data-rec-root] td[data-day] button").nth(17), { hold: 1200 });
};
