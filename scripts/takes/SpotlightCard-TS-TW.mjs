// spotlight card: drift across both cards so each radial spotlight follows
export default async (film) => {
  await film.drift({ secs: 4, rx: 260, ry: 130 });
  film.mark("hero");
};
