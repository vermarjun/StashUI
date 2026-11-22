// Ransom note: re-run the assemble so the cut-out letters fly in again while the second line wobbles
export default async (film) => {
  await film.hold(600);
  await film.click({ role: "button", name: /cut it out again/i }, { hold: 1400 });
  film.mark("hero");
  await film.hold(1200);
};
