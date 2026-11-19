// Click a cell above the heading: a ripple wave spreads outward through the grid, then a second one.
export default async (film) => {
  const cells = film.page.locator("[data-rec-root] .cell");
  await film.click(cells.nth(1 * 27 + 13), { hold: 1500 });
  film.mark("hero");
  await film.click(cells.nth(2 * 27 + 5), { hold: 1600 });
};
