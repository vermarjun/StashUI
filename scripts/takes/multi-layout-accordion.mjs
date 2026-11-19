// multi-layout-accordion — open two more answers so several stay open at once, then close the first one again.
export default async (film) => {
  await film.click({ role: "button", name: /What is a UI component/ }, { hold: 1100 });
  await film.click({ role: "button", name: /Key characteristics/ }, { hold: 1300 });
  film.mark("hero");
  await film.click({ role: "button", name: /What is a UI component/ }, { hold: 1000 });
};
