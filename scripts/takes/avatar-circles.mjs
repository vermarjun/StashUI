// glide across the overlapping avatars and rest on the +99 count badge
export default async (film) => {
  const imgs = film.page.locator("[data-rec-root] img");
  for (let i = 0; i < 5; i++) await film.hover(imgs.nth(i), { hold: 420 });
  await film.hover({ text: "+99" }, { hold: 1200 });
  film.mark("hero");
};
