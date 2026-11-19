// react-aria calendar: pick a date mid-month to show the selected state
export default async (film) => {
  const cells = film.page.locator("[data-rec-root] [role=gridcell]");
  const n = await cells.count();
  await film.click(cells.nth(Math.min(n - 1, 15)), { hold: 1600 });
  film.mark("hero");
  await film.hold(900);
};
