// hovercard4 — hover the blog card so the image zooms out and Read Story slides up
export default async (film) => {
  const story = film.page.getByText("Read Story", { exact: true }).first();
  const b = await story.boundingBox();
  await film.glide({ x: b.x + b.width / 2, y: b.y - 200 }, { secs: 0.6 });
  await film.hover({ x: b.x + b.width / 2, y: b.y + b.height / 2 }, { hold: 1500 });
  film.mark("hero");
  await film.glide({ x: b.x + b.width / 2, y: b.y - 120 }, { secs: 0.5 });
  await film.hold(700);
};
