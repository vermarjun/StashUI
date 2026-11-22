// Transcript: words light up with playback; click a word to seek there
export default async (film) => {
  await film.hold(1200);
  await film.click({ text: "activation" }, { hold: 1600 });
  film.mark("hero");
  await film.click({ text: "timing." }, { hold: 1400 });
};
