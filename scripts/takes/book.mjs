// hover two books so each turns on its spine and shows its cover text
export default async (film) => {
  await film.hover({ text: "The Lost City" }, { hold: 1500 });
  film.mark("hero");
  await film.hover({ text: "Notes" }, { hold: 1500 });
};
