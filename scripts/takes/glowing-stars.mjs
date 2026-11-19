// glowing-stars — move onto the dark star card so every star lights up
export default async (film) => {
  const card = film.page.getByText("Component Library", { exact: true }).first();
  const b = await card.boundingBox();
  const cy = b.y + b.height * 0.2;
  await film.glide({ x: b.x + 20, y: cy }, { secs: 0.7 });
  await film.hold(900);
  await film.glide({ x: b.x + b.width + 60, y: cy }, { secs: 1.4 });
  await film.hold(700);
  film.mark("hero");
  await film.glide({ x: b.x + b.width * 0.55, y: b.y + b.height * 0.7 }, { secs: 0.8 });
  await film.hold(1100);
};
