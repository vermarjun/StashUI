// grid-layout-accordion — open questions in each column; each column keeps one answer open.
export default async (film) => {
  await film.click({ role: "button", name: /UI Component Traits/ }, { hold: 1200 });
  await film.click({ role: "button", name: /Ensure Responsiveness/ }, { hold: 1300 });
  film.mark("hero");
  await film.click({ role: "button", name: /Why are components important/ }, { hold: 1100 });
};
