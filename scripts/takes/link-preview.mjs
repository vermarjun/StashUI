// hover each link to pop its preview card (never click: the link navigates)
export default async (film) => {
  await film.hover({ text: "Next.js" }, { hold: 1800 });
  film.mark("hero");
  await film.hover({ text: "Vercel" }, { hold: 1800 });
};
