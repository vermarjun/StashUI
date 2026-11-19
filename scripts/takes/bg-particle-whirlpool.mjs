// scripts/takes/bg-particle-whirlpool.mjs — the neon swarm streams after the moving cursor
export default async (film) => {
  await film.drift({ secs: 2.6, rx: film.W * 0.3, ry: film.H * 0.22, cy: film.H * 0.42 });
  film.mark("hero");
  await film.drift({ secs: 2.6, rx: film.W * 0.3, ry: film.H * 0.22, cy: film.H * 0.42 });
};
