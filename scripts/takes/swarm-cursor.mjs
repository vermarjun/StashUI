// Swarm Cursor: the swarm flows after the cursor, then pours around a hovered button
export default async (film) => {
  await film.drift({ secs: 2.4, rx: 260, ry: 120 });
  await film.hover({ role: "button", name: /browse components/i }, { hold: 1400 });
  film.mark("hero");
  await film.hover({ role: "button", name: /read the docs/i }, { hold: 1000 });
};
