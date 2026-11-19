// tracing-beam — scroll the article so the gradient beam on the left travels down with the reader
export default async (film) => {
  await film.glide({ x: film.W * 0.55, y: film.H * 0.55 }, { secs: 0.6 });
  await film.scroll(450, { secs: 1.6, hold: 500 });
  film.mark("hero");
  await film.scroll(500, { secs: 1.6, hold: 500 });
  await film.scroll(450, { secs: 1.5, hold: 600 });
};
