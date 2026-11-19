// hovercard3 — hover the photo card so the terracotta overlay reveals the story
export default async (film) => {
  const card = film.page.getByText("Naymur Rahman", { exact: true }).first();
  const b = await card.boundingBox();
  await film.hover({ x: b.x + b.width / 2, y: b.y + b.height / 2 }, { hold: 1600 });
  film.mark("hero");
  await film.hover(film.page.getByText("Learn More", { exact: true }).first(), { hold: 1000 });
};
