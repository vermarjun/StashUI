// Pick the pen (the plate slides), swap the shape tool via its flyout, then throw the dock to the right edge.
export default async (film) => {
  await film.click('[data-rec-root] [aria-label="Pen"]', { hold: 700 });
  await film.click('[data-rec-root] [aria-label="More shapes"]', { hold: 700 });
  await film.click({ role: "menuitemradio", name: /Ellipse/ }, { hold: 700 });
  const grip = film.page.locator('[data-rec-root] [aria-label="Move toolbar"]');
  const b = await grip.boundingBox();
  await film.glide({ x: b.x + b.width / 2, y: b.y + b.height / 2 }, { secs: 0.5 });
  await film.page.mouse.down();
  await film.glide({ x: film.W * 0.78, y: film.H * 0.45 }, { secs: 0.35 });
  await film.page.mouse.up();
  film.mark("hero");
  await film.hold(1200);
};
