// Code comparison: the before pane is focus-blurred; hover it so every line sharpens, then glide to the diff-tinted after pane
export default async (film) => {
  await film.hold(600);
  await film.hover(".leftside", { hold: 1600 });
  film.mark("hero");
  await film.glide(".rightside", { secs: 1.0 });
  await film.hold(1500);
};
