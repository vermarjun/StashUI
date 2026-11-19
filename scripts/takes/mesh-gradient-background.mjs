// mesh-gradient-background — the noisy blob churns; hovering it makes it swell
export default async (film) => {
  await film.glide({ x: film.W / 2, y: film.H / 2 }, { secs: 0.8 });
  await film.drift({ secs: 3.5, cx: film.W / 2, cy: film.H / 2, rx: 140, ry: 80 });
  film.mark("hero");
  await film.hold(800);
};
