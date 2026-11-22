// Media player: press play, then hover the seek bar so the scrubber and time preview show
export default async (film) => {
  await film.click({ role: "button", name: "Play" }, { hold: 1800 });
  film.mark("hero");
  await film.hover("[data-rec-root] [data-slot=media-player-seek]", { hold: 1400 });
};
