// inspira-glowing-effect — the glow tracks the cursor; wander across both cards.
export default async (film) => {
  await film.drift({ secs: 2.2, cx: film.W * 0.3, cy: film.H * 0.5, rx: film.W * 0.12, ry: film.H * 0.1 });
  film.mark("hero");
  await film.drift({ secs: 2.2, cx: film.W * 0.7, cy: film.H * 0.5, rx: film.W * 0.12, ry: film.H * 0.1 });
};
