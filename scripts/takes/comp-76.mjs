// Read-only textarea: typing does nothing, scroll through the fixed copy
export default async (film) => {
  film.mark("kenburns");
  await film.type("textarea", "This is a read-only textarea", { hold: 900 });
  await film.hover({ text: "Read-only textarea" }, { hold: 1300 });
};
