// pick two later thumbnails so the main image swaps under the strip
export default async (film) => {
  await film.click('img[alt="Thumbnail 3"]', { hold: 1400 });
  film.mark("hero");
  await film.click('img[alt="Thumbnail 5"]', { hold: 1500 });
};
