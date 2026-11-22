// Filters: add a Status chip from the field picker and choose a value
export default async (film) => {
  await film.click({ role: "button", name: /add filter/i }, { hold: 800 });
  await film.click({ text: "Status" }, { hold: 800 });
  film.mark("hero");
  await film.click({ text: "In Progress" }, { hold: 1200 });
  await film.press("Escape");
};
