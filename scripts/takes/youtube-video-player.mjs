// Press play: the thumbnail hands over to the embedded YouTube player.
export default async (film) => {
  const play = film.page.getByRole("button", { name: /play video/i }).first();
  await film.hover(play, { hold: 700 });
  await film.click(play, { hold: 3000 });
  film.mark("hero");
  await film.hold(1200);
};
