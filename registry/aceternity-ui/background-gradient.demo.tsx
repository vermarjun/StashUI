import { BackgroundGradient } from "@/registry/aceternity-ui/background-gradient";

export default function Demo() {
  return (
    <div className="flex items-center justify-center p-8">
      <BackgroundGradient className="max-w-sm rounded-[22px] bg-card p-6 sm:p-8">
        <img
          src="https://images.unsplash.com/photo-1760389005000-bf02bf24f463?w=600&h=600&fit=crop&auto=format&q=80"
          alt="Wireless earbuds"
          height={300}
          width={300}
          className="mx-auto aspect-square w-full rounded-xl object-cover"
        />
        <p className="mt-4 mb-2 text-base font-semibold text-card-foreground sm:text-xl">
          Studio Buds Pro
        </p>
        <p className="text-sm text-muted-foreground">
          Lossless audio, adaptive noise cancelling and a 30-hour battery, in a
          case that fits in a coin pocket.
        </p>
        <button className="mt-4 flex items-center space-x-1 rounded-full bg-foreground py-1 pr-1 pl-4 text-xs font-bold text-background">
          <span>Buy now </span>
          <span className="rounded-full bg-background/20 px-2 py-0.5 text-[0.6rem]">
            $129
          </span>
        </button>
      </BackgroundGradient>
    </div>
  );
}
