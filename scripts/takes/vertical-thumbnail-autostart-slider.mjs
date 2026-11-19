// interrupt the autoplay by picking a thumbnail further down the rail
export default async (film) => {
  const thumbs = film.page.locator('img[alt^="Thumbnail"]');
  await film.hold(800);
  await film.click(thumbs.nth(3), { hold: 1500 });
  film.mark("hero");
  await film.click(thumbs.nth(1), { hold: 1500 });
};
