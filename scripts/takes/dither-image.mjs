// Dither image: sweep across the reveal frame so the clean photo wipes over the 1-bit dither and back
export default async (film) => {
  const box = await film.page.locator("[data-rec-root] [data-reveal]").first().boundingBox();
  const y = box.y + box.height * 0.5;
  await film.glide({ x: box.x + box.width * 0.1, y }, { secs: 0.8 });
  await film.glide({ x: box.x + box.width * 0.9, y }, { secs: 1.8 });
  film.mark("hero");
  await film.glide({ x: box.x + box.width * 0.3, y: y + 30 }, { secs: 1.4 });
  await film.hold(500);
};
