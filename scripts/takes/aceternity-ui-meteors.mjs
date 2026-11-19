// Let the meteor shower play while the cursor moves across the card.
export default async (film) => {
  await film.mark("hero");
  await film.glide({ x: film.W * 0.5, y: film.H * 0.55 }, { secs: 0.8 });
  await film.hover({ role: "button", name: /explore/i }, { hold: 1500 });
  await film.glide({ x: film.W * 0.42, y: film.H * 0.3 }, { secs: 1.1 });
  await film.hold(900);
};
