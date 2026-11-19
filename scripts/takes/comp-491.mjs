// range calendar: click a new start date, then an end date, to paint the range
export default async (film) => {
  const days = film.page.locator(
    "[data-rec-root] [data-day]:not([data-disabled]):not([data-outside])",
  );
  const n = await days.count();
  await film.click(days.nth(Math.min(9, n - 1)), { hold: 600 });
  film.mark("hero");
  await film.click(days.nth(Math.min(19, n - 1)), { hold: 1600 });
};
