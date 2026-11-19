// shape the equalizer: lift 1k, cut 4k, and let the tooltips read the values
export default async (film) => {
  const sliders = film.page.locator("[data-rec-root] [role=slider]");
  const moves = [[2, -46], [3, 40]];
  for (const [i, dy] of moves) {
    const b = await sliders.nth(i).boundingBox();
    const x = b.x + b.width / 2;
    const y = b.y + b.height / 2;
    await film.glide({ x, y }, { secs: 0.6 });
    await film.page.mouse.down();
    await film.hold(150);
    await film.glide({ x, y: y + dy }, { secs: 0.9 });
    film.mark("hero");
    await film.hold(400);
    await film.page.mouse.up();
    await film.hold(500);
  }
};
