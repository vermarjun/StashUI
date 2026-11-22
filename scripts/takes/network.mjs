// Network: let a glowing connection draw between two avatars, then hover one so its name pops
export default async (film) => {
  film.hideCursor();
  await film.hold(2600);
  film.mark("hero");
  film.showCursor();
  await film.hover('img[alt="Zane Whitaker"]', { hold: 1400 });
};
