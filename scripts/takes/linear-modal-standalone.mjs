// open the standalone linear card dialog
export default async (film) => {
  await film.hover({ role: "button", name: /Open/ }, { hold: 1500 });
  await film.click({ role: "button", name: /Open/ }, { hold: 1700 });
  await film.mark("hero");
  await film.press("Escape", { hold: 700 });
};
