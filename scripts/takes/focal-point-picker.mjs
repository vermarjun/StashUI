// Focal point picker: drag the point across the photo, crops follow; hover a crop to see its window
export default async (film) => {
  const point = film.page.locator("[data-rec-root] button[aria-label^='Focal point']");
  const b = await point.boundingBox();
  const frame = await film.page.locator("[data-rec-root] .cursor-crosshair").boundingBox();
  await film.glide({ x: b.x + b.width / 2, y: b.y + b.height / 2 });
  await film.page.mouse.down();
  await film.glide({ x: frame.x + frame.width * 0.25, y: frame.y + frame.height * 0.6 }, { secs: 1.1 });
  await film.page.mouse.up();
  await film.hover({ text: "Story" }, { hold: 1300 });
  film.mark("hero");
  await film.hover({ text: "Banner" }, { hold: 1100 });
};
