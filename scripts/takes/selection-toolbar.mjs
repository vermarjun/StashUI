// Selection toolbar: drag-select a phrase and the floating toolbar pops above it
export default async (film) => {
  const p = film.page.locator("[data-rec-root] p").first();
  const b = await p.boundingBox();
  const y = b.y + 12;
  await film.glide({ x: b.x + 4, y });
  await film.page.mouse.down();
  await film.glide({ x: b.x + Math.min(b.width * 0.55, 360), y }, { secs: 0.9 });
  await film.page.mouse.up();
  await film.hold(900);
  film.mark("hero");
  await film.hover("[data-slot=selection-toolbar] button", { hold: 1400 });
};
