// open the OTP dialog and enter the code to verify
export default async (film) => {
  await film.hover({ role: "button", name: /OTP code/ }, { hold: 1500 });
  await film.click({ role: "button", name: /OTP code/ }, { hold: 1200 });
  await film.type("#cofirmation-code", "6548", { delay: 160, hold: 900 });
  await film.mark("hero");
  await film.hold(900);
  await film.press("Escape", { hold: 300 });
};
