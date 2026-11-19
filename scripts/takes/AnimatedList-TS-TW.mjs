// AnimatedList-TS-TW — hover rows to highlight them, scroll so new rows scale in
export default async (film) => {
  await film.hover({ text: "Maya Chen invited you to Q3 Roadmap" }, { hold: 900 });
  await film.hover({ text: "Production deploy succeeded in 42s" }, { hold: 700 });
  await film.scroll(380, { secs: 1.6 });
  film.mark("hero");
  await film.hold(900);
  await film.hover({ text: "Alex merged #482 into main" }, { hold: 1100 });
};
