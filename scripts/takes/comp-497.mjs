// month + year dropdowns: opens the month select, picks March, then a day
export default async (film) => {
  const selects = film.page.locator("[data-rec-root] [role=combobox]");
  await film.click(selects.first(), { hold: 1300 });
  film.mark("hero");
  await film.click({ role: "option", name: /^Mar$/ }, { hold: 1000 });
  await film.click(film.page.locator("[data-rec-root] td[data-day] button").nth(14), { hold: 1200 });
};
