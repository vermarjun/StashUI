// framer-moveable-thumbnails — next twice, then hover a thumbnail so it expands
export default async (film) => {
  const btns = film.page.locator("[data-rec-root] button");
  await film.click(btns.nth(1), { hold: 1200 });
  await film.click(btns.nth(1), { hold: 1200 });
  film.mark("hero");
  await film.hover(btns.nth(6), { hold: 1400 });
};
