// date picker popover: opens it, picks a day, closes to show the value
export default async (film) => {
  await film.click(film.page.locator("[data-rec-root] button").first(), { hold: 1200 });
  film.mark("hero");
  await film.click(film.page.locator("body td[data-day] button").nth(18), { hold: 900 });
  await film.press("Escape", { hold: 1200 });
};
