// Click a travel card to expand it, close, then open another.
export default async (film) => {
  const imgs = film.page.locator("[data-rec-root] img");
  await film.click(imgs.nth(0), { hold: 1700 });
  film.mark("hero");
  const b = await film.root().boundingBox();
  await film.click({ x: b.x + 20, y: b.y + 20 }, { hold: 700 });
  await film.click(imgs.nth(1), { hold: 1400 });
  await film.click({ x: b.x + 20, y: b.y + 20 }, { hold: 600 });
};
