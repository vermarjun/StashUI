// rough-notation strokes draw across each highlighted phrase
export default async (film) => {
  film.mark("kenburns");
  await film.hover({ text: "highlighted text" }, { hold: 1200 });
  await film.hover({ text: "underline mode" }, { hold: 1100 });
  film.mark("hero");
  await film.hover({ text: "box style" }, { hold: 900 });
};
