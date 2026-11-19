// comp-424 — a removable badge; hover the dismiss control, then click it away.
export default async (film) => {
  const x = film.page.locator("[data-rec-root] button").first();
  await film.hover(x, { hold: 1100 });
  film.mark("hero");
  await film.click(x, { hold: 1400 });
};
