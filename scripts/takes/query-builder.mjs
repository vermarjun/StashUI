// Query builder: add a rule, open its field picker and choose a field
export default async (film) => {
  await film.click({ role: "button", name: "Add rule" }, { hold: 1000 });
  await film.click("[data-rec-root] [data-slot=query-builder-field] >> nth=-1", { hold: 1100 });
  film.mark("hero");
  await film.click({ role: "option", name: "Due date" }, { hold: 1200 });
};
