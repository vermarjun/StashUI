// pricing calendar: hovers and picks a grey-priced day in the second month
export default async (film) => {
  const day = film.page.locator("[data-rec-root] td[data-day] button");
  await film.hover(day.nth(44), { hold: 900 });
  await film.click(day.nth(48), { hold: 1500 });
  film.mark("hero");
};
