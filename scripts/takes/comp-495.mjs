// range calendar: picks a start and an end day to paint the range
export default async (film) => {
  const day = film.page.locator("[data-rec-root] td[data-day] button");
  await film.click(day.nth(6), { hold: 700 });
  await film.click(day.nth(16), { hold: 1500 });
  film.mark("hero");
};
