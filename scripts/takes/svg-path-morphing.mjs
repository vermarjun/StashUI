// SVG path morphing: click the button twice, pause bars morph into a play triangle and back
export default async (film) => {
  const btn = { role: "button", name: /play|pause/i };
  await film.click(btn, { hold: 1300 });
  film.mark("hero");
  await film.click(null, { hold: 1300 });
};
