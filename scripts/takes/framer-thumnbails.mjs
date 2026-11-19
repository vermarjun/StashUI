// framer-thumnbails — next twice, then pick a thumbnail from the strip
export default async (film) => {
  const btns = film.page.locator("[data-rec-root] button");
  await film.click(btns.nth(1), { hold: 1200 });
  await film.click(btns.nth(1), { hold: 1200 });
  film.mark("hero");
  await film.click(btns.nth(7), { hold: 1400 });
};
