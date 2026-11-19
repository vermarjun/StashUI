// hover each line so its characters flip in 3D
export default async (film) => {
  await film.hover({ text: "Hover to Flip" }, { hold: 1700 });
  film.mark("hero");
  await film.hover({ text: "3D Typography" }, { hold: 1700 });
};
