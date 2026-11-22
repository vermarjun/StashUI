// Power-off slide: shimmer runs, then drag the knob all the way right to trigger "Shutting down"
export default async (film) => {
  const knob = film.page.locator("[data-rec-root] .cursor-grab").first();
  const box = await knob.boundingBox();
  const cx = box.x + box.width / 2;
  const cy = box.y + box.height / 2;
  await film.glide({ x: cx, y: cy }, { secs: 0.7 });
  await film.page.mouse.down();
  await film.glide({ x: cx + 185, y: cy }, { secs: 1.2 });
  await film.page.mouse.up();
  film.mark("hero");
  await film.hold(1600);
};
