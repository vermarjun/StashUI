// animated tab pill slides; panels bounce and re-stack
export default async (film) => {
  await film.hover({ role: "button", name: /^About$/ }, { hold: 500 });
  await film.click({ role: "button", name: /^About$/ }, { hold: 1300 });
  await film.click({ role: "button", name: /^Work$/ }, { hold: 1300 });
  film.mark("hero");
  await film.click({ role: "button", name: /^Home$/ }, { hold: 1100 });
};
