// parallax-floating — wander the cursor so the photo layers drift at different depths
export default async (film) => {
  await film.hold(1500); // images fade in
  await film.drift({ secs: 5, cx: film.W / 2, cy: film.H / 2, rx: 380, ry: 220 });
  film.mark("hero");
};
