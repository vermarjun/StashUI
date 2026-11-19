// hovercard1 — hover the photo, then the Visit pill so it expands with its label
export default async (film) => {
  const img = film.page.locator("[data-rec-root] article img").first();
  const b = await img.boundingBox();
  await film.hover({ x: b.x + b.width / 2, y: b.y + b.height * 0.4 }, { hold: 900 });
  await film.hover(film.page.locator("[data-rec-root] article button").first(), { hold: 1600 });
  film.mark("hero");
  await film.hover({ x: b.x + b.width / 2, y: b.y + b.height * 0.5 }, { hold: 700 });
};
