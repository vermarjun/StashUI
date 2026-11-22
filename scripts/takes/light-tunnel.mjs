// Light Tunnel: the vanishing point follows the cursor as comets race inward
export default async (film) => {
  await film.drift({ secs: 3.4, rx: 260, ry: 130 });
  film.mark("hero");
  await film.click({ x: film.W * 0.5, y: film.H * 0.5 }, { hold: 1400 });
};
