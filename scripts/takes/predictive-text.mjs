// Predictive text: type a message, the suggestion pill offers completions, click one
export default async (film) => {
  await film.type("[data-rec-root] input[type=text]", "let's meet for din");
  film.mark("hero");
  await film.hold(700);
  await film.click({ text: "dinner" }, { hold: 500 });
  await film.type(null, "tom");
  await film.hold(900);
};
