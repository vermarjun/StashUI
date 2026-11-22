// Exposure slider: drag the tick ruler left then right so the ring and photo exposure follow
export default async (film) => {
  const ruler = film.page.locator("[data-rec-root] .cursor-grab").first();
  const box = await ruler.boundingBox();
  const cx = box.x + box.width / 2;
  const cy = box.y + box.height / 2;
  await film.glide({ x: cx, y: cy }, { secs: 0.7 });
  await film.page.mouse.down();
  await film.glide({ x: cx - 140, y: cy }, { secs: 1.1 });
  film.mark("hero");
  await film.hold(300);
  await film.glide({ x: cx + 90, y: cy }, { secs: 1.3 });
  await film.page.mouse.up();
  await film.hold(800);
};
