// colours shuffle and letters bob; drift over the text to catch the swap
export default async (film) => {
  await film.drift({ secs: 5, cx: film.W / 2, cy: film.H * 0.42, rx: film.W * 0.26, ry: film.H * 0.14 });
  film.mark("hero");
  await film.hold(700);
};
