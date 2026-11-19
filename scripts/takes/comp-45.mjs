// Double OTP: type a six-digit code across both groups
export default async (film) => {
  await film.type("[data-input-otp]", "482913", { delay: 110, hold: 1500 });
  film.mark("hero");
};
