// liquid-glass-mobile-icons — drag one glass icon out of the control cluster
export default async (film) => {
  const icon = film.page.locator("[data-rec-root] [class*='cursor-grab']").nth(1);
  const b = await icon.boundingBox();
  const x = b.x + b.width / 2, y = b.y + b.height / 2;
  await film.glide({ x, y }, { secs: 0.6 });
  await film.hold(250);
  await film.page.mouse.down();
  await film.glide({ x: x + 70, y: y + 20 }, { secs: 0.9 });
  await film.hold(300);
  film.mark("hero");
  await film.page.mouse.up();
  await film.hold(1300);
};
