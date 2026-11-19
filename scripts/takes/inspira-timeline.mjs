// inspira-timeline — scrolling fills the spine and slides each year past
export default async (film) => {
  await film.glide({ x: film.W * 0.48, y: film.H * 0.6 });
  await film.hold(350);
  await film.scroll(680, { secs: 2.8, hold: 900 });
  await film.scroll(360, { secs: 1.5, hold: 700 });
  await film.mark("hero");
};
