import { RippleButton } from "@/registry/magic-ui/ripple-button";

export default function Demo() {
  return (
    <div className="flex items-center justify-center p-8">
      <RippleButton rippleColor="#a5b4fc" className="px-16 py-8 text-3xl font-semibold">
        Send invitation
      </RippleButton>
    </div>
  );
}
