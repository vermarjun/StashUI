// Expand to "Show less", then collapse back to rest.
export default async (film) => {
  await film.hover({ role: "button", name: /show more/i }, { hold: 800 });
  await film.click({ role: "button", name: /show more/i }, { hold: 1100 });
  await film.mark("hero");
  await film.hold(500);
  await film.click({ role: "button", name: /show less/i }, { hold: 800 });
};
