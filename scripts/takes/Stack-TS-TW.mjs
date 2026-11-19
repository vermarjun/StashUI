// Stack: drag the top photo off twice so it springs to the back and the next shows.
export default async (film) => {
  const cards = film.page.locator("div.absolute.inset-0.cursor-grab");

  async function dragTopCard(dx, dy) {
    const n = await cards.count();
    const box = await cards.nth(n - 1).boundingBox();
    if (!box) throw new Error("stack card not found");
    const cx = box.x + box.width / 2;
    const cy = box.y + box.height / 2;
    await film.glide({ x: cx, y: cy });
    await film.page.mouse.down();
    for (let i = 1; i <= 8; i++) {
      await film.glide({ x: cx + (dx * i) / 8, y: cy + (dy * i) / 8 }, { secs: 0.09 });
    }
    await film.page.mouse.up();
    await film.hold(1100);
  }

  await dragTopCard(240, -110);
  film.mark("hero");
  await dragTopCard(230, 120);
  await film.glide({ x: film.W * 0.5, y: film.H * 0.18 }, { secs: 0.6 });
};
