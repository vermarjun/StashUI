// portfolio-experience — scrolling reveals each role, its metrics and stack
export default async (film) => {
  await film.glide({ x: film.W * 0.5, y: film.H * 0.55 });
  await film.hold(250);
  await film.scroll(820, { secs: 2.8, hold: 900 });
  await film.scroll(340, { secs: 1.3, hold: 600 });
  await film.mark("hero");
};
