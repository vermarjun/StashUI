// Echo Text: ghost copies trail the pointer across the word and settle back
export default async (film) => {
  await film.glide({ text: "Afterglow" }, { secs: 0.8 });
  await film.drift({ secs: 2.6, rx: 280, ry: 60 });
  film.mark("hero");
  await film.glide({ x: film.W * 0.5, y: film.H * 0.82 }, { secs: 0.6 });
  await film.hold(1000);
};
