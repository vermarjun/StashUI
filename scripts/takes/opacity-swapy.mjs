// swapy-opacity — drag a card onto another slot; the two trade places
export default async (film) => {
  const src = film.page.getByText("Reduce Costs", { exact: true }).first();
  const dst = film.page.getByText("Decision Making", { exact: true }).first();
  const a = await src.boundingBox();
  const b = await dst.boundingBox();
  await film.glide({ x: a.x + a.width / 2, y: a.y + a.height / 2 }, { secs: 0.7 });
  await film.hold(250);
  await film.page.mouse.down();
  await film.glide({ x: b.x + b.width / 2, y: b.y + b.height / 2 }, { secs: 1.4 });
  await film.hold(500);
  await film.mark("hero");
  await film.page.mouse.up();
  await film.hold(1400);
};
