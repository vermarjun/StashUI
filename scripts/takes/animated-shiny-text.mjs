// shimmer sweep across the announcement text
export default async (film) => {
  await film.drift({ secs: 4.2, cx: film.W / 2, cy: film.H / 2, rx: film.W * 0.24, ry: film.H * 0.1 });
  film.mark("hero");
  await film.hold(600);
};
