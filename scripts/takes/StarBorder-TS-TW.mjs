// star border: ambient; the light streaks orbit both borders on their own, so keep the cursor out of frame
export default async (film) => {
  film.hideCursor();
  await film.hold(2200);
  film.mark("hero");
  await film.hold(3200);
};
