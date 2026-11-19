// date input: picks a day and the text input below fills in
export default async (film) => {
  await film.click(film.page.locator("[data-rec-root] td[data-day] button").nth(18), { hold: 900 });
  await film.hover(film.page.locator("[data-rec-root] input[type=date]"), { hold: 1600 });
  film.mark("hero");
};
