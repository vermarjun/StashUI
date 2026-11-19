// The cipher text decrypts on mount; a slow push-in keeps the clip alive after it settles.
export default async (film) => {
  film.mark("kenburns");
  await film.hold(1800);
  film.mark("hero");
  await film.hold(2600);
};
