// TargetCursor-TS-TW — the target reticle snaps to each button on hover
export default async (film) => {
  await film.hover({ role: "button", name: "Hover me" }, { hold: 1400 });
  film.mark("hero");
  await film.glide({ role: "button", name: "Or me" }, { secs: 1 });
  await film.hold(1300);
};
