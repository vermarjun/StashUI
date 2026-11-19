// comp-254 — temperature slider: push it up, then use the reset button
export default async (film) => {
  const thumb = film.page.locator("[data-rec-root] [role=slider]").first();
  const b = await thumb.boundingBox();
  const y = b.y + b.height / 2;
  await film.glide({ x: b.x + b.width / 2, y });
  await film.page.mouse.down();
  await film.glide({ x: b.x + b.width / 2 + 150, y }, { secs: 1 });
  await film.page.mouse.up();
  await film.hold(1000);
  film.mark("hero");
  await film.click({ role: "button", name: /Reset/ }, { hold: 1300 });
};
