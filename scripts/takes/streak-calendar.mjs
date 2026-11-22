// Streak calendar: hover across the year heatmap so day tooltips pop
export default async (film) => {
  const cells = film.page.locator('[data-rec-root] [aria-label="Streak calendar year view"] button[role="gridcell"]');
  await film.hover(cells.nth(250), { hold: 900 });
  await film.hover(cells.nth(262), { hold: 900 });
  film.mark("hero");
  await film.hover(cells.nth(300), { hold: 900 });
  await film.hover(cells.nth(330), { hold: 900 });
};
