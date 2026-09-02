import { BgAnimateButton } from "@/registry/cult-ui/bg-animate-button";

export default function Demo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4 p-8">
      <BgAnimateButton gradient="sunset" animation="spin" rounded="2xl">
        Get Started
      </BgAnimateButton>
      <BgAnimateButton gradient="ocean" animation="spin-fast" rounded="2xl">
        Explore
      </BgAnimateButton>
      <BgAnimateButton gradient="nebula" animation="spin" rounded="2xl">
        Continue
      </BgAnimateButton>
    </div>
  );
}
