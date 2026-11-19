// magic bento: drift over the bento so cards light up under the cursor
export default async (film) => {
  await film.drift({ secs: 4, rx: 320, ry: 160 });
  film.mark("hero");
};
