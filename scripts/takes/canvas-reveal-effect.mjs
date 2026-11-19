// scripts/takes/canvas-reveal-effect.mjs — hover each card so its dot-matrix canvas reveals
export default async (film) => {
  const cards = film.page.locator('[class*="group/canvas-card"]');
  await film.hover(cards.nth(0), { hold: 1600 });
  await film.hover(cards.nth(1), { hold: 1600 });
  film.mark("hero");
  await film.hover(cards.nth(2), { hold: 1600 });
};
