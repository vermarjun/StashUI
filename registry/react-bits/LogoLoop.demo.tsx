import LogoLoop from "@/registry/react-bits/LogoLoop"
import {
  SiAirbnb,
  SiApple,
  SiGoogle,
  SiMeta,
  SiNetflix,
  SiSpotify,
  SiStripe,
  SiVercel,
} from "react-icons/si"

const logos = [
  { node: <SiApple />, title: "Apple" },
  { node: <SiGoogle />, title: "Google" },
  { node: <SiMeta />, title: "Meta" },
  { node: <SiNetflix />, title: "Netflix" },
  { node: <SiSpotify />, title: "Spotify" },
  { node: <SiStripe />, title: "Stripe" },
  { node: <SiVercel />, title: "Vercel" },
  { node: <SiAirbnb />, title: "Airbnb" },
]

export default function Demo() {
  return (
    <div className="w-full max-w-3xl py-8 text-foreground">
      <p className="mb-8 text-center text-sm text-muted-foreground">
        Trusted by teams at
      </p>
      <LogoLoop
        logos={logos}
        speed={80}
        pauseOnHover
        scaleOnHover
        logoHeight={40}
        gap={64}
        fadeOut
        fadeOutColor="var(--background)"
        ariaLabel="Customer logos"
      />
    </div>
  )
}
