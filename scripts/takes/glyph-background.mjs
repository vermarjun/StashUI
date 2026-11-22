// Glyph background: drift to leave a light trail through the characters, then click to send a pulse
export default async (film) => {
  await film.drift({ secs: 2.4, rx: 300, ry: 140 });
  await film.click({ x: film.W * 0.35, y: film.H * 0.4 }, { hold: 900 });
  film.mark("hero");
  await film.click({ x: film.W * 0.68, y: film.H * 0.62 }, { hold: 1200 });
};
