import Cmp from "@/registry/react-bits/ProfileCard";

export default function Demo() {
  return (
    <div className="flex min-h-[640px] w-full items-center justify-center p-6">
      <Cmp
        name="Daniel Okafor"
        title="Design Engineer"
        handle="danokafor"
        status="Online"
        contactText="Contact Me"
        avatarUrl="/images/profile-card-person.png"
        iconUrl=""
        grainUrl="/noise.gif"
        showUserInfo
        enableTilt
        behindGlowEnabled
        behindGlowColor="rgba(125, 190, 255, 0.67)"
        innerGradient="linear-gradient(145deg,#60496e8c 0%,#71C4FF44 100%)"
      />
    </div>
  );
}
