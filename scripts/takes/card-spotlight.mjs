// spotlight card: drift so the spotlight follows the cursor across the card
export default async (film) => {
  await film.drift({ secs: 3.6, rx: 150, ry: 110 });
  film.mark("hero");
};
