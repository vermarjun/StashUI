// comp-156 — picking the radio that expands a field, then typing in it
export default async (film) => {
  await film.click({ text: "Radio with expansion" }, { hold: 900 });
  await film.type("input[aria-label='Additional Information']", "Ship by Friday");
  await film.mark("hero");
  await film.click({ text: "Radio without expansion" }, { hold: 1300 });
};
