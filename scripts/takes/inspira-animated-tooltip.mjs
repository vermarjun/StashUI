// glide across the avatar stack so each profile card springs up
export default async (film) => {
  await film.hover({ role: "img", name: "Sarah Chen" }, { hold: 1500 });
  film.mark("hero");
  await film.hover({ role: "img", name: "Marcus Johnson" }, { hold: 1500 });
  await film.hover({ role: "img", name: "Priya Patel" }, { hold: 1500 });
};
