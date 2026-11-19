// liquid-glass-weather — drag the current-weather glass tile and let it spring back
export default async (film) => {
  const temp = film.page.getByText("+18°C", { exact: true }).first();
  const b = await temp.boundingBox();
  const x = b.x + b.width / 2, y = b.y + b.height / 2;
  await film.glide({ x, y }, { secs: 0.6 });
  await film.hold(250);
  await film.page.mouse.down();
  await film.glide({ x: x + 70, y: y + 50 }, { secs: 0.9 });
  await film.hold(300);
  film.mark("hero");
  await film.page.mouse.up();
  await film.hold(1300);
};
