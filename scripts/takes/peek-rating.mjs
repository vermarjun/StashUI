// Peek Rating: sweep across the stars so the wave lifts, then commit 5 with a pop
export default async (film) => {
  await film.hover({ role: "radio", name: "Okay" }, { hold: 600 });
  await film.hover({ role: "radio", name: "Great" }, { hold: 600 });
  await film.click({ role: "radio", name: "Life-changing" }, { hold: 400 });
  film.mark("hero");
  await film.hold(1000);
};
