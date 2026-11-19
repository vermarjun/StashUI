// disabled dates calendar: start a range on the first free weekday, end a few later
export default async (film) => {
  const days = film.page.locator(
    "[data-rec-root] [data-day]:not([data-disabled]):not([data-outside])",
  );
  const n = await days.count();
  await film.click(days.nth(Math.min(1, n - 1)), { hold: 600 });
  film.mark("hero");
  await film.click(days.nth(Math.min(6, n - 1)), { hold: 1600 });
};
