// dither field: the dots brighten around the pointer, so wander across the field
export default async (film) => {
  await film.glide({ x: film.W * 0.35, y: film.H * 0.7 }, { secs: 0.7 });
  film.mark("hero");
  await film.drift({ secs: 4.5, cx: film.W / 2, cy: film.H * 0.62, rx: 320, ry: 120 });
};
