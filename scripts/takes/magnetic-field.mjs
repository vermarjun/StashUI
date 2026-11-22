// Magnetic field: sweep the cursor through the filings so they swing toward it, then switch to repel
export default async (film) => {
  await film.drift({ secs: 2.6, cx: film.W * 0.5, cy: film.H * 0.42, rx: 280, ry: 90 });
  film.mark("hero");
  await film.click({ role: "button", name: /^repel$/i }, { hold: 300 });
  await film.drift({ secs: 2, cx: film.W * 0.5, cy: film.H * 0.42, rx: 220, ry: 70 });
};
