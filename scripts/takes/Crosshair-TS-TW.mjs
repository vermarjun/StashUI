// crosshair: hide the rig cursor (the crosshair IS the cursor), sweep across the field, then hover each link so the lines glitch
export default async (film) => {
  film.hideCursor();
  await film.glide({ x: film.W * 0.25, y: film.H * 0.3 }, { secs: 0.6 });
  await film.glide({ x: film.W * 0.72, y: film.H * 0.38 }, { secs: 1.1 });
  await film.hover({ text: "Read the essay" }, { hold: 1100 });
  film.mark("hero");
  await film.hover({ text: "View the archive" }, { hold: 1100 });
  await film.glide({ x: film.W * 0.6, y: film.H * 0.75 }, { secs: 0.8 });
};
