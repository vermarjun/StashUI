import ClerkOTP from "./clerk-otp"

export default function ClerkOTPDemo() {
  return (
    <div className="flex w-full justify-center">
      <ClerkOTP
        delay={3500}
        cardTitle="Multifactor Authentication"
        cardDescription="Each user's self-serve multifactor settings are enforced automatically during sign-in."
      />
    </div>
  )
}
