// comp-264 — drag the X slider (its input follows), then Reset snaps all three back
export default async (film) => {
  const thumb = film.page.locator("[data-rec-root] [role=slider]").first();
  const b = await thumb.boundingBox();
  const cx = b.x + b.width / 2, cy = b.y + b.height / 2;
  await film.glide({ x: cx, y: cy }, { secs: 0.6 });
  await film.page.mouse.down();
  for (let i = 1; i <= 20; i++) { await film.page.mouse.move(cx + i * 6, cy); await film.hold(30); }
  await film.page.mouse.up();
  film.mark("hero");
  await film.hold(900);
  await film.click({ role: "button", name: /reset/i }, { hold: 1200 });
};
