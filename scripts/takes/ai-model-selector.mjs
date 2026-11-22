// Open the model picker, slide effort to Max, then switch model and watch the effort track reshape.
export default async (film) => {
  await film.click({ role: "button", name: /^Model:/ }, { hold: 900 });
  const track = film.page.locator("[data-rec-root] [role=slider]").first();
  const b = await track.boundingBox();
  await film.click({ x: b.x + b.width - 14, y: b.y + b.height / 2 }, { hold: 900 });
  film.mark("hero");
  await film.click({ role: "radio", name: /Atlas Lite 3/ }, { hold: 1300 });
};
