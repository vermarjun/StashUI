// hover each link to show its live preview card
export default async (film) => {
  await film.hover({ text: "Vercel" }, { hold: 2000 });
  film.mark("hero");
  await film.hover({ text: "GitHub (static)" }, { hold: 2000 });
};
