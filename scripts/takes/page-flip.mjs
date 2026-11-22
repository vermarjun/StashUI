// Drag the cover's corner over the spine, then turn one more page.
export default async (film) => {
  const book = film.page.locator("[data-rec-root] div.touch-none.select-none").first();
  const turn = async () => {
    const b = await book.boundingBox();
    const y = b.y + b.height * 0.94;
    await film.glide({ x: b.x + b.width * 0.97, y }, { secs: 0.7 });
    await film.page.mouse.down();
    await film.glide({ x: b.x + b.width * 0.55, y: b.y + b.height * 0.7 }, { secs: 0.6 });
    await film.glide({ x: b.x + b.width * 0.08, y }, { secs: 0.5 });
    await film.page.mouse.up();
  };
  await turn();
  await film.hold(1100);
  await turn();
  film.mark("hero");
  await film.hold(1200);
};
