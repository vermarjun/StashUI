// Curved option wheel: scroll it a few notches, items tilt and blur away from the focus.
export default async (film) => {
  await film.glide({ x: film.W * 0.25, y: film.H * 0.5 });
  await film.scroll(420, { secs: 1.4, hold: 700 });
  film.mark("hero");
  await film.scroll(-260, { secs: 1.2, hold: 1000 });
};
