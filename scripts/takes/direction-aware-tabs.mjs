// direction-aware tab bubble + content slides per direction
export default async (film) => {
  await film.click({ role: "button", name: /^Develop$/ }, { hold: 1300 });
  await film.click({ role: "button", name: /^Deploy$/ }, { hold: 1300 });
  film.mark("hero");
  await film.click({ role: "button", name: /^Design$/ }, { hold: 1100 });
};
