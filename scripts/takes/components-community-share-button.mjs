// hovering swaps "Share" for the platform icons; click the X icon, then return
export default async (film) => {
  const btn = film.page.locator("[data-rec-root] button").first();
  await film.hover(btn, { hold: 1500 });
  film.mark("hero");
  const b = await btn.boundingBox();
  await film.click({ x: b.x + b.width * 0.5, y: b.y + b.height * 0.5 }, { hold: 1300 });
  await film.glide({ x: b.x + b.width * 1.6, y: b.y + b.height * 0.4 });
};
