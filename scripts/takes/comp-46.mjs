// comp-46 — international phone input: typing a number detects the country flag
export default async (film) => {
  await film.type("[data-rec-root] input", "+1 415 555 0132", { delay: 60 });
  film.mark("hero");
  await film.hold(1400);
};
