// SVG draw on scroll: wheel down inside the panel so the route draws itself with the marker riding it
export default async (film) => {
  await film.glide({ x: film.W * 0.5, y: film.H * 0.5 }, { secs: 0.6 });
  await film.scroll(420, { secs: 1.8 });
  film.mark("hero");
  await film.scroll(360, { secs: 1.8 });
  await film.hold(600);
};
