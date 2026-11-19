// range picker popover: opens it and picks a start and end day (DOM clicks keep the popover open)
export default async (film) => {
  await film.click(film.page.locator("[data-rec-root] button").first(), { hold: 1400 });
  film.mark("hero");
  const day = film.page.locator("body td[data-day] button");
  await film.hover(day.nth(6), { hold: 400 });
  await day.nth(6).evaluate((el) => el.click());
  await film.hold(500);
  await film.hover(day.nth(17), { hold: 400 });
  await day.nth(17).evaluate((el) => el.click());
  await film.hold(1600);
};
