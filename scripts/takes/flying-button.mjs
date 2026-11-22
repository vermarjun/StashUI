// FlyingButton: hover so the button lifts off on its jets, carrying the cursor
export default async (film) => {
  await film.hover({ text: "Launch project" }, { hold: 1400 });
  film.mark("hero");
  await film.hold(2200);
};
