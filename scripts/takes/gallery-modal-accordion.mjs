// hover the photo accordion, then open one full-screen
export default async (film) => {
  const imgs = film.page.locator("[data-rec-root] img");
  await film.hover(imgs.nth(1), { hold: 1000 });
  await film.hover(imgs.nth(4), { hold: 700 });
  await film.mark("hero");
  await film.click(imgs.nth(4), { hold: 1700 });
  await film.press("Escape", { hold: 600 });
};
