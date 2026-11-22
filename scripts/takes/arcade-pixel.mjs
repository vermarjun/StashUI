// Arcade pixel: ambient attract screen, type-on headline, marquee and blinking coin prompt
export default async (film) => {
  film.hideCursor();
  await film.hold(2200);
  film.mark("hero");
  await film.hold(3000);
};
