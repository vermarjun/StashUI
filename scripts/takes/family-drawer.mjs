// Family drawer: open Share, navigate into the Copy-link view, then back and close.
export default async (film) => {
  await film.click({ role: "button", name: /^share$/i }, { hold: 1500 });
  film.mark("hero");
  await film.click({ role: "button", name: /copy link/i }, { hold: 1700 });
  await film.click({ role: "button", name: /back/i }, { hold: 1000 });
  await film.press("Escape", { hold: 700 });
};
