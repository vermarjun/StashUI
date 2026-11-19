// open the staggered full-screen menu, hold, then close it
export default async (film) => {
  await film.click({ role: "button", name: /Open menu/ }, { hold: 2400 });
  await film.mark("hero");
  await film.hover({ text: "Work" }, { hold: 900 });
  await film.click({ role: "button", name: /Close menu/ }, { hold: 1600 });
};
