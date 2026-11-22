// Expandable card: click a track row, it morphs into the detail modal, then Escape back
export default async (film) => {
  await film.hover({ text: "Concrete Garden" }, { hold: 600 });
  await film.click({ text: "Paper Satellites" }, { hold: 1800 });
  film.mark("hero");
  await film.press("Escape");
  await film.hold(900);
};
