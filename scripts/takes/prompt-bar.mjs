// Composer: type a prompt, pull in a source with @, send and watch the busy spark.
export default async (film) => {
  await film.type("textarea[aria-label=Prompt]", "Compare churn using ");
  await film.type(null, "@sa", { delay: 90 });
  film.mark("hero");
  await film.hold(1300);
  await film.press("Enter");
  await film.hold(500);
  await film.press("Enter");
  await film.hold(1600);
};
