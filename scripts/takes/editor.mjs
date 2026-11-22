// Editor: select a phrase so the bubble menu appears, then open its Format menu
export default async (film) => {
  const word = film.page.locator("[data-rec-root] .ProseMirror strong").first();
  const box = await word.boundingBox();
  await film.glide({ x: box.x + 4, y: box.y + box.height / 2 }, { secs: 0.7 });
  await film.page.mouse.down();
  await film.page.mouse.move(box.x + box.width - 2, box.y + box.height / 2, { steps: 12 });
  await film.page.mouse.up();
  await film.hold(900);
  await film.click({ role: "button", name: /^format$/i }, { hold: 1500 });
  film.mark("hero");
  await film.press("Escape");
};
