// Save the place, open Change, and move it to another collection.
export default async (film) => {
  await film.click({ role: "button", name: /^Save$/ }, { hold: 900 });
  await film.click({ text: "Change" }, { hold: 900 });
  film.mark("hero");
  await film.click({ text: "Tokyo 2027" }, { hold: 1300 });
};
