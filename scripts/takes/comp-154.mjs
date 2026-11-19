// comp-154 — a disabled radio group: hover the rows, slow camera push-in
export default async (film) => {
  await film.hover({ text: "Option 1" }, { hold: 1000 });
  await film.hover({ text: "Option 3" }, { hold: 1300 });
  film.mark("kenburns");
  film.mark("hero");
};
