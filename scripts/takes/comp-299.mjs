// open the sonner toast, then use its undo action to dismiss it
export default async (film) => {
  await film.click({ role: "button", name: /Show sonner/ }, { hold: 1300 });
  film.mark("hero");
  await film.hover({ role: "button", name: "Undo" }, { hold: 1000 });
  await film.click({ role: "button", name: "Undo" }, { hold: 900 });
};
