// media-between-text — hover the sentence so the photo opens up between the words
export default async (film) => {
  await film.hover({ text: "that's a nice (" }, { hold: 1800 });
  film.mark("hero");
  await film.glide({ x: film.W * 0.5, y: film.H * 0.9 }, { secs: 0.7 });
  await film.hold(1000);
  await film.hover({ text: ") view!" }, { hold: 1500 });
};
