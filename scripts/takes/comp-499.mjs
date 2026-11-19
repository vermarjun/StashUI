// week numbers: hovers a week row, then picks a day
export default async (film) => {
  const rows = film.page.locator("[data-rec-root] .rdp-week");
  await film.hover(rows.nth(2), { hold: 1000 });
  await film.click(film.page.locator("[data-rec-root] td[data-day] button").nth(17), { hold: 1400 });
  film.mark("hero");
};
