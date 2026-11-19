// scripts/takes/flickering-grid.mjs — nudge the viewport so the canvas sizes itself, then let the squares flicker
export default async (film) => {
  await film.hideCursor();
  await film.page.setViewportSize({ width: film.W, height: film.H - 2 });
  await film.hold(200);
  await film.page.setViewportSize({ width: film.W, height: film.H });
  await film.hold(1800);
  film.mark("hero");
  await film.hold(3200);
};
