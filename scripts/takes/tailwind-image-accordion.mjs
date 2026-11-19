// hover two portraits so the accordion widens that panel and lifts its name
export default async (film) => {
  await film.hover({ text: "Flualy Cual" }, { hold: 1400 });
  film.mark("hero");
  await film.hover({ text: "Naymur Rahman" }, { hold: 1400 });
};
