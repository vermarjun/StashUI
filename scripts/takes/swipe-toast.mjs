// Toast with a burning fuse: fire one, then swipe it down to dismiss.
export default async (film) => {
  await film.click({ role: "button", name: /archive file/i }, { hold: 1300 });
  film.mark("hero");
  const toast = film.page.locator("[data-rec-root] [role=status]").last();
  const b = await toast.boundingBox();
  const x = b.x + b.width * 0.4;
  await film.glide({ x, y: b.y + b.height / 2 });
  await film.page.mouse.down();
  await film.glide({ x, y: b.y + b.height / 2 + 110 }, { secs: 0.5 });
  await film.page.mouse.up();
  await film.hold(1100);
};
