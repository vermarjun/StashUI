// gooey morph between tab labels as the active tab moves
export default async (film) => {
  await film.click({ role: "button", name: /^About$/ }, { hold: 1100 });
  await film.click({ role: "button", name: /^Work$/ }, { hold: 1100 });
  await film.click({ role: "button", name: /^Contact$/ }, { hold: 1300 });
  film.mark("hero");
  await film.click({ role: "button", name: /^Home$/ }, { hold: 1000 });
};
