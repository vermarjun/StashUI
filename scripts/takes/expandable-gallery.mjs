// Hover the gallery panels so one at a time expands to full width.
export default async (film) => {
  const imgs = film.page.locator("[data-rec-root] img");
  await film.hover(imgs.nth(0), { hold: 1000 });
  await film.hover(imgs.nth(2), { hold: 1000 });
  film.mark("hero");
  await film.hover(imgs.nth(4), { hold: 1200 });
};
