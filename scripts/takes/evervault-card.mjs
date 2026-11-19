// evervault card: drift over the card so the encrypted text scrambles and the sheen follows
export default async (film) => {
  await film.drift({ secs: 3.8, rx: 150, ry: 110 });
  film.mark("hero");
};
