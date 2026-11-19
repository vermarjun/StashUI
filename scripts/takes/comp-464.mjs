// pagination with jump-to-page select: open the page menu and pick Page 6
export default async (film) => {
  await film.hover({ role: "link", name: /go to last page/i }, { hold: 600 });
  await film.click("#select-page", { hold: 900 });
  await film.hover({ role: "option", name: /page 6/i }, { hold: 600 });
  await film.mark("hero");
  await film.click({ role: "option", name: /page 6/i }, { hold: 1400 });
};
