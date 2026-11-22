// Music toggle: press play so the record spins and the waveform comes alive, then pause
export default async (film) => {
  await film.click({ role: "button", name: /play/i }, { hold: 2600 });
  film.mark("hero");
  await film.click({ role: "button", name: /pause/i }, { hold: 1000 });
};
