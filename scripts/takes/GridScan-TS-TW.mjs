// GridScan — the glowing scan plane sweeps the tunnel; the pointer tilts the view.
export default async (film) => {
  await film.drift({ secs: 2.6, rx: film.W * 0.2, ry: film.H * 0.15 });
  film.mark("hero");
  await film.drift({ secs: 2.6, rx: film.W * 0.2, ry: film.H * 0.15 });
};
