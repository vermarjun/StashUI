// SwipeRow: drag the first email left to reveal its action drawer, then let it snap
export default async (film) => {
  const box = await film.page.locator("[data-rec-root] [role=group]").first().boundingBox();
  const y = box.y + box.height / 2;
  const x = box.x + box.width * 0.75;
  await film.glide({ x, y }, { secs: 0.8 });
  await film.page.mouse.down();
  await film.glide({ x: x - 70, y }, { secs: 0.4 });
  await film.glide({ x: x - 150, y }, { secs: 0.5 });
  await film.page.mouse.up();
  film.mark("hero");
  await film.hold(1500);
  await film.click({ x: box.x + box.width * 0.3, y }, { hold: 900 });
};
