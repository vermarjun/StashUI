// single-date calendar: move the selection a couple of weeks ahead
export default async (film) => {
  const days = film.page.locator(
    "[data-rec-root] [data-day]:not([data-disabled]):not([data-outside])",
  );
  const n = await days.count();
  await film.click(days.nth(Math.min(n - 1, 20)), { hold: 1400 });
  film.mark("hero");
  await film.hold(800);
};
