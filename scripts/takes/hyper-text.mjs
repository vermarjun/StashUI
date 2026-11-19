// hover scrambles the letters, then they resolve into the word
export default async (film) => {
  await film.hover({ text: "Hover over me" }, { hold: 1700 });
  await film.glide({ x: film.W * 0.8, y: film.H * 0.2 }, { secs: 0.6 });
  film.mark("hero");
  await film.hover({ text: "Hover over me" }, { hold: 1400 });
};
