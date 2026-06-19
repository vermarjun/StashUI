import Stepper, { Step } from "@/registry/react-bits/Stepper";

export default function Demo() {
  return (
    <div className="w-full h-full flex items-center justify-center p-6 bg-[#120F17] rounded-xl min-h-[360px]">
      <Stepper
        initialStep={1}
        onStepChange={(s) => console.log("step", s)}
        onFinalStepCompleted={() => console.log("done")}
        backButtonText="Back"
        nextButtonText="Continue"
      >
        <Step>
          <h2 className="text-lg font-semibold text-white mb-1">Create account</h2>
          <p className="text-sm text-neutral-400">Enter your email and choose a password to get started.</p>
        </Step>
        <Step>
          <h2 className="text-lg font-semibold text-white mb-1">Verify email</h2>
          <p className="text-sm text-neutral-400">We sent a 6-digit code to your inbox. Paste it below.</p>
        </Step>
        <Step>
          <h2 className="text-lg font-semibold text-white mb-1">Set up profile</h2>
          <p className="text-sm text-neutral-400">Add a display name and avatar so teammates recognise you.</p>
        </Step>
      </Stepper>
    </div>
  );
}
