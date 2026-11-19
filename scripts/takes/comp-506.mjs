// preset sidebar: jumps to Last week, then picks an enabled day
export default async (film) => {
  await film.click({ role: "button", name: /^Last week$/ }, { hold: 1100 });
  film.mark("hero");
  await film.click(film.page.locator("[data-rec-root] td[data-day]:not([data-disabled]) button").last(), { hold: 1400 });
};
