// two months: picks a start in the first month and an end in the second
export default async (film) => {
  const day = film.page.locator("[data-rec-root] td[data-day] button");
  await film.click(day.nth(12), { hold: 700 });
  await film.click(day.nth(50), { hold: 1500 });
  film.mark("hero");
};
