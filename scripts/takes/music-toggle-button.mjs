// MusicToggleButton: press play so the pill springs open and the waveform dances
export default async (film) => {
  await film.click({ role: "button", name: "Play music" }, { hold: 1600 });
  film.mark("hero");
  await film.hold(1600);
  await film.click({ role: "button", name: "Pause music" }, { hold: 800 });
};
