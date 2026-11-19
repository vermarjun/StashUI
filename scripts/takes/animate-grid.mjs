// animate grid: drift across the grid so cells light up under the cursor
export default async (film) => {
  await film.drift({ secs: 3.8, rx: 180, ry: 140 });
  film.mark("hero");
};
