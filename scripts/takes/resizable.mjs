// Resizable: drag the sidebar handle right then back, then pull the terminal up
export default async (film) => {
  const page = film.page;
  const handles = page.locator('[data-rec-root] [data-slot="resizable-handle"]');
  const side = await handles.nth(0).boundingBox();
  const sx = side.x + side.width / 2, sy = side.y + side.height / 2;
  await film.glide({ x: sx, y: sy }, { secs: 0.7 });
  await page.mouse.down();
  await film.glide({ x: sx + 160, y: sy }, { secs: 0.9 });
  film.mark("hero");
  await film.glide({ x: sx + 40, y: sy }, { secs: 0.8 });
  await page.mouse.up();
  const term = await handles.nth(1).boundingBox();
  const tx = term.x + term.width / 2, ty = term.y + term.height / 2;
  await film.glide({ x: tx, y: ty }, { secs: 0.6 });
  await page.mouse.down();
  await film.glide({ x: tx, y: ty - 110 }, { secs: 0.9 });
  await film.glide({ x: tx, y: ty - 30 }, { secs: 0.7 });
  await page.mouse.up();
};
