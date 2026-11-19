// framer-normal-carousel — next twice to slide through the photos
export default async (film) => {
  const btns = film.page.locator("[data-rec-root] button");
  await film.click(btns.nth(1), { hold: 1200 });
  film.mark("hero");
  await film.click(btns.nth(1), { hold: 1300 });
};
