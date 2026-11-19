// auto-cycling focus box, then hover the manual row word by word
export default async (film) => {
  await film.hold(1200);
  const y = film.H * 0.72;
  await film.glide({ x: film.W * 0.24, y }, { secs: 0.6 });
  await film.hold(700);
  await film.glide({ x: film.W * 0.5, y }, { secs: 0.8 });
  await film.hold(700);
  film.mark("hero");
  await film.glide({ x: film.W * 0.76, y }, { secs: 0.8 });
  await film.hold(700);
};
