// SVG draw on scroll: wheel down inside the panel so the route draws itself
// with the marker riding it, ending with the whole route in view.
export default async (film) => {
  await film.glide({ x: film.W * 0.5, y: film.H * 0.5 }, { secs: 0.6 });
  await film.scroll(230, { secs: 1.8 });
  await film.scroll(210, { secs: 1.8 });
  film.mark("hero");
  await film.hold(800);
};
