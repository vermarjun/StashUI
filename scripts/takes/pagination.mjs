// pagination: click page 2, then jump to the last page
export default async (film) => {
  await film.hover({ role: "link", name: "3" }, { hold: 700 });
  await film.click({ role: "link", name: "2" }, { hold: 1100 });
  await film.mark("hero");
  await film.click({ role: "link", name: "7" }, { hold: 1400 });
};
