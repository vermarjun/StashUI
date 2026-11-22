// Waveform scrub: press play so the bars fill, then drag the playhead back
export default async (film) => {
  await film.click("[data-rec-root] button.z-20", { hold: 2200 });
  film.mark("hero");
  const handle = film.page.locator("[data-rec-root] .cursor-grab").first();
  const box = await handle.boundingBox();
  await film.glide({ x: box.x + box.width / 2, y: box.y + box.height * 0.2 }, { secs: 0.6 });
  await film.page.mouse.down();
  await film.glide({ x: box.x + box.width / 2 + 180, y: box.y + box.height * 0.2 }, { secs: 1.0 });
  await film.page.mouse.up();
  await film.hold(600);
};
