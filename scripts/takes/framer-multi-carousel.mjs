// framer-multi-carousel — next twice so the multi-slide track advances
export default async (film) => {
  const btns = film.page.locator("[data-rec-root] button");
  await film.click(btns.nth(1), { hold: 1200 });
  film.mark("hero");
  await film.click(btns.nth(1), { hold: 1300 });
};
