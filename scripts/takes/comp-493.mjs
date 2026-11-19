// multiple-date calendar: toggle two more days into the existing selection
export default async (film) => {
  const days = film.page.locator(
    "[data-rec-root] [data-day]:not([data-disabled]):not([data-outside])",
  );
  const n = await days.count();
  await film.click(days.nth(Math.min(10, n - 1)), { hold: 800 });
  film.mark("hero");
  await film.click(days.nth(Math.min(16, n - 1)), { hold: 1400 });
};
