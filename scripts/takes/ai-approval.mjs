// AI approval: hover the options, pick one so it expands to fill the card, then reset
export default async (film) => {
  await film.hover({ role: "button", name: /delete permanently/i }, { hold: 700 });
  await film.click({ role: "button", name: /archive to cold storage/i }, { hold: 1300 });
  film.mark("hero");
  await film.click({ role: "button", name: /ask again/i }, { hold: 1000 });
};
