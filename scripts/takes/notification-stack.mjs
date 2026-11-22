// notification-stack — hover to fan the stack out, then swipe the top card away
export default async (film) => {
  const page = film.page;
  const stack = page.getByLabel("Notifications").first();
  const b = await stack.boundingBox();
  const cx = b.x + b.width / 2, top = b.y + 40;
  await film.hover({ x: cx, y: top }, { hold: 1400 });
  film.mark("hero");
  await page.mouse.down();
  for (let i = 1; i <= 10; i++) {
    await page.mouse.move(cx + i * 28, top);
    await film.hold(16);
  }
  await page.mouse.up();
  await film.hold(1300);
};
