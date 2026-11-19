// gradient border: ambient; the indigo highlight sweeps around the card border by itself
export default async (film) => {
  film.hideCursor();
  await film.hold(2000);
  film.mark("hero");
  await film.hold(3000);
};
