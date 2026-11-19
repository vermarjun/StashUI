// single calendar: picks a day so the rounded day style and selection show
export default async (film) => {
  const day = film.page.locator("[data-rec-root] td[data-day] button");
  await film.hover(day.nth(12), { hold: 800 });
  await film.click(day.nth(19), { hold: 1400 });
  film.mark("hero");
};
