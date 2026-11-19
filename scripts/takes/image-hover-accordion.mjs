// hover the collapsed image strips so each one widens and reveals its caption
export default async (film) => {
  const imgs = film.page.locator("[data-rec-root] img");
  await film.hover(imgs.nth(0), { hold: 1500 });
  film.mark("hero");
  await film.hover(imgs.nth(3), { hold: 1500 });
};
