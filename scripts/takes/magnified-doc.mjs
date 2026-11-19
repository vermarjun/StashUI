// Glide across the dock so the icons magnify, then rest on Mail.
export default async (film) => {
  for (const label of ["Home", "Search", "Files", "Mail", "Calendar", "Music", "Settings"]) {
    await film.glide({ role: "button", name: new RegExp(`^${label}$`, "i") }, { secs: 0.35 });
  }
  await film.hover({ role: "button", name: /^mail$/i }, { hold: 1500 });
  film.mark("hero");
  await film.hold(500);
};
