// hovering letters makes each one swell and gain a stroke
export default async (film) => {
  await film.drift({ secs: 4.4, cx: film.W / 2, cy: film.H / 2, rx: film.W * 0.26, ry: film.H * 0.12 });
  film.mark("hero");
  await film.hold(600);
};
