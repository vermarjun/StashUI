// open the note popover, write a note and submit
export default async (film) => {
  await film.hover({ role: "button", name: /Leave a note/ }, { hold: 1500 });
  await film.click({ role: "button", name: /Leave a note/ }, { hold: 1300 });
  await film.type("textarea", "Invite Sam to the design review.", { delay: 22, hold: 500 });
  await film.mark("hero");
  await film.click({ role: "button", name: /Submit note/ }, { hold: 800 });
};
