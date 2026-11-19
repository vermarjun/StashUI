// three months: picks a range spanning two months
export default async (film) => {
  const day = film.page.locator("[data-rec-root] td[data-day] button");
  await film.click(day.nth(10), { hold: 700 });
  await film.click(day.nth(50), { hold: 1500 });
  film.mark("hero");
};
