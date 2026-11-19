// Hover around the radial menu, then pick a destination and return home.
export default async (film) => {
  const items = film.page.locator("[data-rec-root] [role=menuitem]");
  const n = await items.count();
  for (let i = 1; i < Math.min(n, 5); i++) await film.hover(items.nth(i), { hold: 700 });
  await film.click(items.nth(2), { hold: 1200 });
  film.mark("hero");
  await film.click(items.nth(0), { hold: 900 });
};
