// click down the vertical thumbnail rail to change the large photo
export default async (film) => {
  const thumbs = film.page.locator('img[alt^="Thumbnail"]');
  await film.click(thumbs.nth(2), { hold: 1400 });
  film.mark("hero");
  await film.click(thumbs.nth(4), { hold: 1500 });
};
