// carousel-3d — drag the 3D ring sideways to spin it, then let it settle
export default async (film) => {
  const stage = film.page.locator("[data-rec-root] div").filter({ hasText: "Drag to rotate" }).first();
  const b = await stage.boundingBox();
  const x = b.x + b.width * 0.62, y = b.y + b.height * 0.62;
  await film.glide({ x, y }, { secs: 0.7 });
  await film.hold(350);
  await film.page.mouse.down();
  await film.glide({ x: x - 220, y }, { secs: 1.3 });
  await film.hold(300);
  film.mark("hero");
  await film.page.mouse.up();
  await film.hold(1400);
};
