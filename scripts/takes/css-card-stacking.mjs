// css card stacking: scroll a viewport at a time so the sticky cards land one on top of another (3 deep)
export default async (film) => {
  await film.glide({ x: film.W * 0.5, y: film.H * 0.55 }, { secs: 0.5 });
  await film.scroll(film.H * 1.05, { secs: 1.3 });
  await film.hold(500);
  await film.scroll(film.H * 0.95, { secs: 1.2 });
  await film.hold(500);
  await film.scroll(film.H * 0.95, { secs: 1.2 });
  film.mark("hero");
  await film.hold(900);
  await film.scroll(film.H * 0.95, { secs: 1.2 });
  await film.hold(700);
};
