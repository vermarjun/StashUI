// moving-line — scroll the travel log so the line on the left draws down alongside the content
export default async (film) => {
  await film.glide({ x: film.W * 0.55, y: film.H * 0.55 }, { secs: 0.6 });
  await film.scroll(420, { secs: 1.6, hold: 500 });
  film.mark("hero");
  await film.scroll(480, { secs: 1.6, hold: 500 });
  await film.scroll(420, { secs: 1.5, hold: 600 });
};
