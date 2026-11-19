// two review rows stream in opposite directions; hover the top row to pause it, then release
export default async (film) => {
  await film.hold(1400);
  film.mark("hero");
  await film.hover({ x: film.W * 0.5, y: film.H * 0.42 }, { hold: 1500 });
  await film.glide({ x: film.W * 0.5, y: film.H * 0.1 }, { secs: 0.7 });
  await film.hold(1500);
};
