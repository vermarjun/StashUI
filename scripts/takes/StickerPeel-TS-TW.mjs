// StickerPeel: hover to lift the sticker's top edge, press to peel it further, drag it a little, release
export default async (film) => {
  const box = await film.page.locator(".sticker-container img").first().boundingBox();
  const cx = box.x + box.width / 2;
  const cy = box.y + box.height / 2;
  await film.glide({ x: cx, y: cy + box.height * 0.15 }, { secs: 0.7 });
  await film.hold(1300);
  await film.page.mouse.down();
  await film.hold(500);
  film.mark("hero");
  await film.glide({ x: cx - 90, y: cy + 30 }, { secs: 0.9 });
  await film.glide({ x: cx + 10, y: cy + box.height * 0.15 }, { secs: 0.8 });
  await film.page.mouse.up();
  await film.hold(800);
};
