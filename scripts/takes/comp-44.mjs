// Single OTP: click the slots and type a real one-time code
export default async (film) => {
  await film.type("[data-input-otp]", "4829", { delay: 120, hold: 1500 });
  film.mark("hero");
};
