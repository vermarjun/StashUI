// Face rating: sweep the segments so the face morphs frown -> smile, then commit "Amazing"
export default async (film) => {
  await film.hover({ role: "radio", name: /Rate 1 of 5/ }, { hold: 700 });
  await film.hover({ role: "radio", name: /Rate 3 of 5/ }, { hold: 600 });
  await film.click({ role: "radio", name: /Rate 5 of 5/ }, { hold: 1300 });
  film.mark("hero");
};
