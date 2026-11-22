// about-bento — hover the big card so the star spins, then scroll the rest of the grid into view
export default async (film) => {
  await film.scroll(220, { secs: 1.2 });
  await film.hover({ text: "BOUNDARIES." }, { hold: 2200 });
  film.mark("hero");
  await film.hover({ text: "Join the community" }, { hold: 1000 });
};
