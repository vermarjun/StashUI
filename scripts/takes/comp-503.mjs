// calendar + time input: picks a day, then sets a time
export default async (film) => {
  await film.click(film.page.locator("[data-rec-root] td[data-day] button").nth(17), { hold: 800 });
  await film.type(film.page.locator("[data-rec-root] input[type=time]"), "14:30", { delay: 120, hold: 1300 });
  film.mark("hero");
};
