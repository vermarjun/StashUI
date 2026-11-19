// Letters near the pointer swell in weight and width: sweep slowly along each line.
export default async (film) => {
  const y1 = film.H * 0.46, y2 = film.H * 0.575;
  await film.glide({ x: film.W * 0.24, y: y1 }, { secs: 0.6 });
  await film.glide({ x: film.W * 0.5, y: y1 }, { secs: 1.2 });
  film.mark("hero");
  await film.glide({ x: film.W * 0.76, y: y1 }, { secs: 1.2 });
  await film.glide({ x: film.W * 0.66, y: y2 }, { secs: 0.5 });
  await film.glide({ x: film.W * 0.33, y: y2 }, { secs: 1.6 });
  await film.hold(400);
};
