// scroll the marketing section so the headline and imagery reveal
export default async (film) => {
  await film.glide({ x: film.W * 0.55, y: film.H * 0.55 }, { secs: 0.6 });
  await film.scroll(260, { secs: 1.5, hold: 400 });
  await film.scroll(220, { secs: 1.3, hold: 400 });
  film.mark("hero");
  await film.scroll(-120, { secs: 1.0, hold: 500 });
};
