// fire both portal actions: activate it, then shift dimensions
export default async (film) => {
  await film.click({ role: "button", name: /activate portal/i }, { hold: 1600 });
  film.mark("hero");
  await film.click({ role: "button", name: /shift dimensions/i }, { hold: 1800 });
};
