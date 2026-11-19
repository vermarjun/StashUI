// tilted card: drift across the cards to tilt them and reveal the floating caption
export default async (film) => {
  await film.drift({ secs: 3.8, rx: 210, ry: 110 });
  film.mark("hero");
};
