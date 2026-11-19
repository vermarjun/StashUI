// Scroll-scrubbed: the heading starts below the fold and each character floats up into place.
export default async (film) => {
  await film.glide({ x: film.W * 0.5, y: film.H * 0.55 }, { secs: 0.6 });
  await film.scroll(170, { secs: 1.5, hold: 250 });
  await film.scroll(170, { secs: 1.5, hold: 250 });
  film.mark("hero");
  await film.scroll(110, { secs: 1.2, hold: 900 });
};
