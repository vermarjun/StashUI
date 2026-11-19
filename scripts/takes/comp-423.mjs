// comp-423 — a checkbox folded into a badge; click to unselect, then reselect.
export default async (film) => {
  await film.hover({ text: "Selectable" }, { hold: 1000 });
  await film.click({ text: "Selectable" }, { hold: 1300 });
  film.mark("hero");
  await film.hold(700);
  await film.click({ text: "Selectable" }, { hold: 1100 });
};
