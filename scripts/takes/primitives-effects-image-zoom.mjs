// ImageZoom — hover the photo to zoom in, then pan across the peaks by moving the cursor
export default async (film) => {
  const b = await film.page.locator("[data-zoom]").boundingBox();
  await film.glide({ x: b.x + b.width * 0.3, y: b.y + b.height * 0.35 }, { secs: 0.8 });
  await film.hold(900);
  film.mark("hero");
  await film.glide({ x: b.x + b.width * 0.75, y: b.y + b.height * 0.3 }, { secs: 1.8 });
  await film.glide({ x: b.x + b.width * 0.55, y: b.y + b.height * 0.7 }, { secs: 1.3 });
  await film.glide({ x: b.x + b.width / 2, y: b.y + b.height + 60 }, { secs: 0.7 });
  await film.hold(600);
};
