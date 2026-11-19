// Type a query, press Enter: the text shatters into pixels and lands in the submitted list.
export default async (film) => {
  await film.type("[data-rec-root] input[type=text]", "ambient lighting");
  await film.press("Enter", { hold: 900 });
  film.mark("hero");
  await film.type(null, "brutalist portfolio");
  await film.press("Enter", { hold: 1200 });
};
