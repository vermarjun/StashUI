// gravity-stars — park the cursor so stars visibly gather and brighten around it, then move and let them follow.
export default async (film) => {
  await film.glide({ x: film.W * 0.72, y: film.H * 0.4 }, { secs: 0.9 });
  await film.hold(1600);
  film.mark("hero");
  await film.glide({ x: film.W * 0.3, y: film.H * 0.62 }, { secs: 1.6 });
  await film.hold(1500);
};
