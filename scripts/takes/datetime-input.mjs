// Natural-language date: type a phrase, Enter parses it into a real date + time.
export default async (film) => {
  await film.type('input[type="text"]', "tomorrow at 5pm", { hold: 400 });
  await film.press("Enter", { hold: 600 });
  film.mark("hero");
  await film.hold(1200);
};
