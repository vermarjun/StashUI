// Tags without editing: add Motion and Accessibility with Enter
export default async (film) => {
  await film.type('input[placeholder="Add a tag..."]', "Motion", { hold: 300 });
  await film.press("Enter", { hold: 900 });
  await film.type('input[placeholder="Add a tag..."]', "Accessibility", { hold: 300 });
  await film.press("Enter", { hold: 1100 });
  film.mark("hero");
};
