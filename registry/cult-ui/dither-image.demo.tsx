import {
  DitherImage,
  DitherImageCaption,
  DitherImageContent,
  DitherImageFrame,
  DitherImageReveal,
  DitherImageOverlay,
} from "@/registry/cult-ui/dither-image";

export default function Demo() {
  return (
    <div className="flex flex-wrap items-start justify-center gap-10 p-10">
      {/* Basic dithered image */}
      <DitherImage>
        <DitherImageFrame size="md" aspectRatio="square" className="w-56">
          <DitherImageContent
            src="https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?w=400&h=400&fit=crop&auto=format"
            alt="Mountain landscape dithered"
            fill
            sizes="224px"
          />
        </DitherImageFrame>
        <DitherImageCaption>Mountain landscape, dithered</DitherImageCaption>
      </DitherImage>

      {/* Partial dither reveal */}
      <DitherImage>
        <DitherImageReveal className="w-56 overflow-hidden rounded-xl" style={{ aspectRatio: "1/1" }}>
          <DitherImageFrame size="lg" aspectRatio="square" className="w-full">
            <DitherImageContent
              src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400&h=400&fit=crop&auto=format"
              alt="Forest path"
              fill
              sizes="224px"
            />
          </DitherImageFrame>
          <DitherImageOverlay
            src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400&h=400&fit=crop&auto=format"
            alt=""
            fill
            sizes="224px"
            direction="r"
            from={0}
            to={60}
          />
        </DitherImageReveal>
        <DitherImageCaption>Partial reveal, left→right</DitherImageCaption>
      </DitherImage>
    </div>
  );
}
