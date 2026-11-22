// svg-follow-scroll — scroll a little so the stroke draws itself down past the headline, then scroll back so it retracts.
// Kept short: past ~350px the headline leaves the frame and only a lone line remains.
export default async (film) => {
  await film.glide({ x: film.W * 0.5, y: film.H * 0.6 }, { secs: 0.6 });
  await film.scroll(150, { secs: 1.4 });
  await film.scroll(150, { secs: 1.4 });
  film.mark("hero");
  await film.hold(500);
  await film.scroll(-300, { secs: 1.8 });
};
