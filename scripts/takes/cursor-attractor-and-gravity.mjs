// cursor-attractor-and-gravity — sweep the cursor through the avatar cloud so it scatters and re-forms
export default async (film) => {
  await film.hold(1200); // avatars settle around the centred attractor
  await film.drift({ secs: 4, cx: film.W * 0.5, cy: film.H * 0.45, rx: 150, ry: 80 });
  film.mark("hero");
  await film.glide({ x: film.W * 0.5, y: film.H * 0.92 }, { secs: 0.8 });
  await film.hold(900);
};
