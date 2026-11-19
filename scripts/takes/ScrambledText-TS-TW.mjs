// cursor sweep scrambles characters near the pointer, then they resolve
export default async (film) => {
  const y = film.H * 0.5;
  await film.glide({ x: film.W * 0.14, y }, { secs: 0.6 });
  await film.glide({ x: film.W * 0.86, y }, { secs: 2.4 });
  film.mark("hero");
  await film.hold(700);
  await film.glide({ x: film.W * 0.2, y: y + 18 }, { secs: 1.4 });
  await film.hold(400);
};
