// DotField — slow cursor pass through the field so the dots bulge around it.
export default async (film) => {
  await film.glide({ x: film.W * 0.3, y: film.H * 0.4 }, { secs: 0.8 });
  await film.drift({ secs: 2.6, rx: film.W * 0.25, ry: film.H * 0.2 });
  film.mark("hero");
  await film.drift({ secs: 2.0, rx: film.W * 0.18, ry: film.H * 0.16 });
};
