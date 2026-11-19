// inspira-sparkles — ambient: a dense field of twinkling sparkles drifts beneath the glowing headline rule.
export default async (film) => {
  await film.hideCursor();
  await film.hold(2400);
  film.mark("hero");
  await film.hold(3000);
};
