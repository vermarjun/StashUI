import LogoCarousel from "@/registry/cult-ui/logo-carousel";

export default function Demo() {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-8 py-16">
      <p className="text-sm font-medium tracking-wide text-muted-foreground">
        Trusted by teams shipping at
      </p>
      <LogoCarousel columnCount={3} />
    </div>
  );
}
