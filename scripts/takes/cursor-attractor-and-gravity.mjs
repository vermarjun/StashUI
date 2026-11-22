// cursor-attractor-and-gravity — sweep the cursor through the avatar cloud so it scatters and re-forms
export default async (film) => {
  await film.hold(1200); // avatars settle around the attractor
  await film.drift({ secs: 4.5, cx: film.W * 0.33, cy: film.H * 0.5, rx: 220, ry: 130 });
  film.mark("hero");
  await film.glide({ x: film.W * 0.85, y: film.H * 0.85 }, { secs: 0.8 });
  await film.hold(900);
};
