// Gooey dropdown: open it so the pill melts into the panel, hover an item, pick it so it melts back
export default async (film) => {
  await film.click({ role: "button", name: "Share" }, { hold: 1300 });
  film.mark("hero");
  await film.hover({ text: "Send by email" }, { hold: 900 });
  await film.click({ text: "Send by email" }, { hold: 1000 });
};
