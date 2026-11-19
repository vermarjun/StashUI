// Gradient border buttons: the conic borders rotate on their own; hover each so the eye follows
export default async (film) => {
  await film.hold(600);
  await film.hover({ text: "Get early access" }, { hold: 1300 });
  film.mark("hero");
  await film.hover({ text: "Explore templates" }, { hold: 1300 });
  await film.click(null, { hold: 800 });
};
