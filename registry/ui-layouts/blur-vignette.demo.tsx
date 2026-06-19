import { BlurVignette, BlurVignetteArticle } from "@/registry/ui-layouts/blur-vignette";

export default function Demo() {
  return (
    <div className="flex flex-wrap gap-6 items-center justify-center p-8">
      {/* Text content behind a blur vignette */}
      <BlurVignette
        radius="20px"
        inset="18px"
        transitionLength="50px"
        blur="8px"
        classname="w-72 h-72 bg-muted"
      >
        <div className="flex flex-col gap-3 p-6 h-full justify-center">
          <p className="text-sm font-semibold text-foreground uppercase tracking-widest">
            Blur Vignette
          </p>
          <p className="text-muted-foreground text-sm leading-relaxed">
            A progressive blur mask fades the edges of any container, keeping
            the center sharp while the periphery dissolves naturally.
          </p>
          <p className="text-xs text-muted-foreground/60">
            radius · inset · blur · transitionLength
          </p>
        </div>
        <BlurVignetteArticle />
      </BlurVignette>

      {/* Image behind a blur vignette */}
      <BlurVignette
        radius="20px"
        inset="12px"
        transitionLength="60px"
        blur="10px"
        classname="w-72 h-72"
      >
        <img
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=600&fit=crop"
          alt="mountain landscape"
          className="w-full h-full object-cover"
        />
        <BlurVignetteArticle />
      </BlurVignette>
    </div>
  );
}
