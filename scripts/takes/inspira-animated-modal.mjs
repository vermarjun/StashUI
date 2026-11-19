// open the animated modal, then dismiss it
export default async (film) => {
  await film.hover({ role: "button", name: /Open Modal/ }, { hold: 1500 });
  await film.click({ role: "button", name: /Open Modal/ }, { hold: 1500 });
  await film.mark("hero");
  await film.click({ x: 70, y: 70 }, { hold: 500 });
};
