// confetti — clicking the buttons bursts confetti across the panel
export default async (film) => {
  await film.click({ role: "button", name: /confetti/i }, { hold: 1600 });
  await film.click({ role: "button", name: /fire/i }, { hold: 1500 });
  await film.mark("hero");
};
