// Clear button: click the ✕ to empty the field, then type something new (the ✕ comes back).
export default async (film) => {
  await film.hover({ role: "button", name: /clear input/i }, { hold: 500 });
  await film.click(null, { hold: 700 });
  await film.type(null, "Quarterly roadmap", { hold: 600 });
  film.mark("hero");
  await film.hover({ role: "button", name: /clear input/i }, { hold: 700 });
};
