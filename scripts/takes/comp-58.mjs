// Spaced OTP: type a four-digit code into the separated slots
export default async (film) => {
  await film.type("[data-input-otp]", "4829", { delay: 120, hold: 1500 });
  film.mark("hero");
};
