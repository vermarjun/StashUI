// scripts/takes/components-backgrounds-stars.mjs — star field parallaxes with the moving cursor
export default async (film) => {
  film.mark("hero");
  await film.drift({ secs: 4.8, rx: film.W * 0.27, ry: film.H * 0.23 });
};
