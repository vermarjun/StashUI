// click through nav items so the gooey pill bursts and re-forms on each one
export default async (film) => {
  await film.click({ role: "link", name: /Work/ }, { hold: 1300 });
  film.mark("hero");
  await film.click({ role: "link", name: /Contact/ }, { hold: 1300 });
  await film.click({ role: "link", name: /Home/ }, { hold: 1300 });
};
