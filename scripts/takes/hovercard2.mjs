// hovercard2 — hover the portrait card: colour returns, image grows, role label rises
export default async (film) => {
  const card = film.page.getByText("Naymur Rahman", { exact: true }).first();
  const b = await card.boundingBox();
  await film.glide({ x: b.x + b.width / 2, y: b.y - 120 }, { secs: 0.6 });
  await film.hover({ x: b.x + b.width / 2, y: b.y + 40 }, { hold: 1500 });
  film.mark("hero");
  await film.glide({ x: b.x + b.width / 2 + 30, y: b.y + 90 }, { secs: 0.5 });
  await film.hold(700);
};
