// scroll-reveal: words sharpen and rise into focus as they enter view
export default async (film) => {
  await film.glide({ x: film.W * 0.55, y: film.H * 0.55 }, { secs: 0.6 });
  await film.scroll(240, { secs: 1.5, hold: 400 });
  await film.scroll(220, { secs: 1.4, hold: 400 });
  film.mark("hero");
  await film.scroll(-120, { secs: 1.0, hold: 500 });
};
