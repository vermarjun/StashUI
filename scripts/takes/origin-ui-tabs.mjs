// tab list switches panels
export default async (film) => {
  await film.click({ role: "tab", name: /Analytics/ }, { hold: 1300 });
  await film.click({ role: "tab", name: /Settings/ }, { hold: 1300 });
  film.mark("hero");
  await film.click({ role: "tab", name: /Overview/ }, { hold: 1100 });
};
