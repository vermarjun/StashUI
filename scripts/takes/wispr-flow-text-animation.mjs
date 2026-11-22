// Wispr flow text: text runs along the curve, then enter edit mode and drag an anchor to reshape the path
export default async (film) => {
  await film.hold(800);
  await film.click({ text: "Edit path" }, { hold: 700 });
  const anchor = film.page.locator("#hero-svg circle").nth(20);
  const box = await anchor.boundingBox();
  if (box) {
    const x = box.x + box.width / 2;
    const y = box.y + box.height / 2;
    await film.glide({ x, y }, { secs: 0.6 });
    await film.page.mouse.down();
    await film.glide({ x: x + 60, y: y - 110 }, { secs: 0.9 });
    await film.page.mouse.up();
    film.mark("hero");
    await film.hold(900);
  }
  await film.click({ text: "Done editing" }, { hold: 900 });
};
