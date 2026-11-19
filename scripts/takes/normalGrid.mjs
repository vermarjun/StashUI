// Tour the portfolio grid with the cursor so the layout reads.
export default async (film) => {
  await film.drift({ secs: 4.2, rx: film.W * 0.26, ry: film.H * 0.2 });
  film.mark("hero");
  await film.hold(900);
};
