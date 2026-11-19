// entrance-only whip/fade/calm text animations: slow push-in over all lines
export default async (film) => {
  film.mark("kenburns");
  await film.hover({ text: "Hello World" }, { hold: 1200 });
  await film.hover({ text: "Beautiful Animation" }, { hold: 1100 });
  film.mark("hero");
  await film.hover({ text: "Smooth and Fluid" }, { hold: 900 });
};
