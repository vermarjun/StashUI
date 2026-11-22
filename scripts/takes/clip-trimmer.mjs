// Pull the end handle in so it snaps to whole seconds, then play the trimmed loop.
export default async (film) => {
  const end = film.page.locator('[data-rec-root] [aria-label="Trim end"]');
  const b = await end.boundingBox();
  const y = b.y + b.height / 2;
  await film.glide({ x: b.x + b.width / 2, y }, { secs: 0.7 });
  await film.page.mouse.down();
  await film.glide({ x: b.x + b.width / 2 - 90, y }, { secs: 0.9 });
  await film.page.mouse.up();
  await film.hold(400);
  await film.click({ role: "button", name: "Play" }, { hold: 400 });
  film.mark("hero");
  await film.hold(1800);
};
