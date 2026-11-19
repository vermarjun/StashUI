// liquid glass sidebar: hover the menu, then drag the glass card
export default async (film) => {
  await film.hover({ role: "button", name: /sales analytics/i }, { hold: 1000 });
  const nav = film.page.locator("[data-rec-root] nav").first();
  const b = await nav.boundingBox();
  await film.glide({ x: b.x - 10, y: b.y + 10 });
  await film.page.mouse.down();
  await film.glide({ x: b.x - 90, y: b.y + 50 }, { secs: 1.0 });
  await film.page.mouse.up();
  await film.mark("hero");
  await film.hold(1300);
};
