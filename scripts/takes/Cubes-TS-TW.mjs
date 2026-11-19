// Cubes tilt away from the pointer: sweep across the grid, then click for a ripple.
export default async (film) => {
  await film.glide({ x: film.W * 0.32, y: film.H * 0.3 }, { secs: 0.6 });
  await film.glide({ x: film.W * 0.66, y: film.H * 0.62 }, { secs: 1.6 });
  film.mark("hero");
  await film.glide({ x: film.W * 0.42, y: film.H * 0.66 }, { secs: 1.0 });
  await film.click(null, { hold: 1500 });
};
