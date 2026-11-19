// expand a row to reveal its detail panel, then collapse it again
export default async (film) => {
  await film.click({ role: "button", name: /expand details for alex thompson/i }, { hold: 1800 });
  film.mark("hero");
  await film.hold(900);
  await film.click({ role: "button", name: /collapse details for alex thompson/i }, { hold: 1300 });
};
