// Drag the volume slider past the right end so the elastic stretch shows.
export default async (film) => {
  const track = film.page.locator("[data-rec-root] .cursor-grab").first();
  const b = await track.boundingBox();
  const y = b.y + b.height / 2;
  await film.glide({ x: b.x + b.width * 0.6, y });
  await film.page.mouse.down();
  await film.glide({ x: b.x + b.width + 46, y }, { secs: 0.9 });
  await film.hold(450);
  film.mark("hero");
  await film.glide({ x: b.x + b.width * 0.28, y }, { secs: 0.9 });
  await film.page.mouse.up();
  await film.hold(800);
};
