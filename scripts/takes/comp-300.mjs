// open the custom sonner toast, then dismiss it with its undo action
export default async (film) => {
  await film.click({ role: "button", name: /Custom sonner/ }, { hold: 1300 });
  film.mark("hero");
  await film.hover({ role: "button", name: "Undo" }, { hold: 1000 });
  await film.click({ role: "button", name: "Undo" }, { hold: 900 });
};
