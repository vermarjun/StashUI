// AI voice: record a take (waveform scrolls), stop, then play it back
export default async (film) => {
  await film.click({ role: "button", name: /recording|playback/i }, { hold: 1400 });
  film.mark("hero");
  await film.hold(1200);
  await film.click(null, { hold: 700 });
  await film.click(null, { hold: 1800 });
};
