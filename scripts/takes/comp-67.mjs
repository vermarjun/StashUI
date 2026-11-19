// Disabled textarea: show the greyed-out state and the not-allowed cursor
export default async (film) => {
  film.mark("kenburns");
  await film.hover({ text: "Disabled textarea" }, { hold: 1200 });
  await film.hover("textarea", { hold: 1600 });
};
