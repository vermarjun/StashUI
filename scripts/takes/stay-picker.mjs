// Stay picker: pick check-in, sweep the pill across the week, pick check-out, reserve
export default async (film) => {
  await film.click({ role: "button", name: /^Nov 12,/ }, { hold: 500 });
  await film.hover({ role: "button", name: /^Nov 15,/ }, { hold: 500 });
  await film.click({ role: "button", name: /^Nov 17,/ }, { hold: 900 });
  film.mark("hero");
  await film.click({ role: "button", name: /^Reserve$/ }, { hold: 1000 });
};
