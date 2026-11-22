// Let the receipt print line by line, then yank it down so it tears off and falls.
export default async (film) => {
  await film.hold(2600);
  const paper = film.page.locator("[data-rec-root] [role=document]").first();
  const b = await paper.boundingBox();
  const x = b.x + b.width / 2;
  const y = b.y + Math.min(b.height * 0.7, 260);
  await film.glide({ x, y }, { secs: 0.6 });
  await film.page.mouse.down();
  await film.glide({ x: x + 10, y: y + 40 }, { secs: 0.4 });
  await film.glide({ x: x + 30, y: y + 160 }, { secs: 0.15 });
  await film.page.mouse.up();
  film.mark("hero");
  await film.hold(1400);
};
