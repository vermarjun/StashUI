// Filters: add a Status chip from the field picker, pick a condition, then a value.
// Picking a field opens the condition menu first ("Select condition"); the value
// list only opens after a condition is chosen.
export default async (film) => {
  await film.click({ role: "button", name: /add filter/i }, { hold: 600 });
  await film.click({ text: "Status", exact: true }, { hold: 600 });
  await film.click({ text: "is any of", exact: true }, { hold: 700 });
  film.mark("hero");
  await film.click({ text: "In Progress", exact: true }, { hold: 1100 });
  await film.press("Escape");
};
