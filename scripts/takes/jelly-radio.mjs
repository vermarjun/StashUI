// Jelly radio chips: pick a few, the chosen chip swells and barges its neighbours.
export default async (film) => {
  await film.click({ role: "radio", name: "Team" }, { hold: 900 });
  film.mark("hero");
  await film.click({ role: "radio", name: "Hobby" }, { hold: 900 });
  await film.click({ role: "radio", name: "Pro" }, { hold: 900 });
};
