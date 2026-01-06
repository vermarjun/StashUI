import LogoLoop from "@/registry/react-bits/LogoLoop"

const logos = [
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
    alt: "Amazon",
    width: 80,
    height: 28,
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
    alt: "Google",
    width: 80,
    height: 28,
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
    alt: "Microsoft",
    width: 80,
    height: 28,
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg",
    alt: "Meta",
    width: 28,
    height: 28,
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
    alt: "Apple",
    width: 24,
    height: 28,
  },
]

export default function Demo() {
  return (
    <div className="w-full max-w-2xl py-8">
      <LogoLoop logos={logos} speed={80} pauseOnHover logoHeight={32} gap={48} fadeOut />
    </div>
  )
}
