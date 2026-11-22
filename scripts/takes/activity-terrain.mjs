// Fold the terrain flat into a heatmap, raise it back, then drag to spin the 3D view.
export default async (film) => {
  await film.click({ role: "button", name: "Flat" }, { hold: 1200 });
  await film.click({ role: "button", name: "Terrain" }, { hold: 1000 });
  const map = film.page.locator("[data-rec-root] [role=img]").first();
  const b = await map.boundingBox();
  const y = b.y + b.height / 2;
  await film.glide({ x: b.x + b.width * 0.35, y }, { secs: 0.5 });
  await film.page.mouse.down();
  await film.glide({ x: b.x + b.width * 0.7, y: y - 20 }, { secs: 1.0 });
  film.mark("hero");
  await film.page.mouse.up();
  await film.hold(900);
};
