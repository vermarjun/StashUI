// Cursor-reactive border: the blue radial glow tracks the pointer. Sweep slowly, then type.
export default async (film) => {
  const email = await film.page.locator('input[type="email"]').boundingBox();
  const name = await film.page.locator('input[type="text"]').boundingBox();
  const ey = email.y + email.height / 2;
  const ny = name.y + name.height / 2;
  await film.glide({ x: email.x + 20, y: ey }, { secs: 0.6 });
  await film.glide({ x: email.x + email.width - 20, y: ey }, { secs: 1.4 });
  film.mark("hero");
  await film.glide({ x: name.x + name.width - 20, y: ny }, { secs: 0.6 });
  await film.glide({ x: name.x + 40, y: ny }, { secs: 1.2 });
  await film.type('input[type="email"]', "maya@stashui.dev", { hold: 700 });
};
