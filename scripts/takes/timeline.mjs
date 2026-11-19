// timeline — scrolling fills the spine and slides each milestone past
export default async (film) => {
  await film.glide({ x: film.W * 0.5, y: film.H * 0.6 });
  await film.hold(250);
  await film.scroll(760, { secs: 2.8, hold: 900 });
  await film.scroll(320, { secs: 1.3, hold: 600 });
  await film.mark("hero");
};
