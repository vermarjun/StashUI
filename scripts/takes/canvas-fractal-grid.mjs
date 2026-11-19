// scripts/takes/canvas-fractal-grid.mjs — the dot/fractal grid distorts around the moving cursor
export default async (film) => {
  film.mark("hero");
  await film.drift({ secs: 4.8, rx: film.W * 0.27, ry: film.H * 0.23 });
};
