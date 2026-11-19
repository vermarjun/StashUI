// AnimatedContent — scroll down a changelog so each card slides / scales in as it enters view
export default async (film) => {
  await film.glide({ x: film.W * 0.5, y: film.H * 0.55 }, { secs: 0.6 });
  await film.scroll(320, { secs: 1.3, hold: 700 });
  await film.scroll(260, { secs: 1.2, hold: 700 });
  film.mark("hero");
  await film.scroll(260, { secs: 1.2, hold: 900 });
};
