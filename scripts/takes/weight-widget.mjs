// Weight widget: swipe the dial twice so numbers ride the arc and spring under the pointer
export default async (film) => {
  // grab the number sitting under the pointer (card centre, number row)
  const card = film.page.locator("[data-rec-root] div.touch-none").first();
  const b = await card.boundingBox();
  const y = b.y + b.height * 0.36;
  const x = b.x + b.width / 2;
  for (const step of [0, 1]) {
    await film.glide({ x, y }, { secs: 0.5 });
    await film.page.mouse.down();
    await film.glide({ x: x - 90, y }, { secs: 0.35 });
    await film.page.mouse.up();
    await film.hold(step ? 900 : 600);
    if (step) film.mark("hero");
  }
  await film.glide({ x, y }, { secs: 0.5 });
  await film.page.mouse.down();
  await film.glide({ x: x + 90, y }, { secs: 0.35 });
  await film.page.mouse.up();
  await film.hold(700);
};
