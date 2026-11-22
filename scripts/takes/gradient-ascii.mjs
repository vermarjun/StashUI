// Gradient ASCII: the cursor scrambles the characters as it passes over the glow
export default async (film) => {
  await film.drift({ secs: 3.2, rx: 300, ry: 140 });
  film.mark("hero");
  await film.click(null, { hold: 1200 });
};
