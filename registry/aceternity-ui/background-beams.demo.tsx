import { BackgroundBeams } from "@/registry/aceternity-ui/background-beams";

export default function Demo() {
  return (
    <div className="relative flex h-[600px] w-full flex-col items-center justify-center overflow-hidden rounded-md bg-neutral-950 antialiased">
      <div className="relative z-10 mx-auto max-w-2xl p-4">
        <h1 className="bg-gradient-to-b from-neutral-200 to-neutral-600 bg-clip-text text-center font-sans text-lg font-bold text-transparent md:text-7xl">
          Join the waitlist
        </h1>
        <p className="mx-auto my-4 max-w-lg text-center text-sm text-neutral-400">
          Welcome to MailJet, the best transactional email service on the web.
          We provide reliable, scalable, and customizable email solutions for
          your business. Whether you&apos;re sending order confirmations,
          password reset emails, or promotional campaigns, MailJet has got you
          covered.
        </p>
        <input
          type="email"
          placeholder="you@company.com"
          className="relative z-10 mt-4 w-full rounded-lg border border-neutral-800 bg-neutral-950 px-4 py-2.5 text-neutral-200 placeholder:text-neutral-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
      </div>
      <BackgroundBeams />
    </div>
  );
}
