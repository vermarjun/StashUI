// particles-bg — cursor sweeps pull the particles; slow push-in adds body.
export default async (film) => {
  film.mark("kenburns");
  const y = film.H * 0.5;
  await film.glide({ x: film.W * 0.16, y }, { secs: 0.7 });
  await film.glide({ x: film.W * 0.84, y }, { secs: 0.9 });
  film.mark("hero");
  await film.hold(600);
  await film.glide({ x: film.W * 0.2, y: film.H * 0.32 }, { secs: 0.8 });
  await film.glide({ x: film.W * 0.8, y: film.H * 0.68 }, { secs: 0.9 });
};
