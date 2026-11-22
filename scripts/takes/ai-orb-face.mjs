// AI orb face: eyes follow the cursor, then switch to Thinking and Done to change expression
export default async (film) => {
  await film.drift({ secs: 2, cx: film.W * 0.5, cy: film.H * 0.35, rx: 260, ry: 90 });
  await film.click({ role: "button", name: /^thinking$/i }, { hold: 1300 });
  film.mark("hero");
  await film.click({ role: "button", name: /^done$/i }, { hold: 1300 });
};
