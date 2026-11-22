import CarouselCards from "@/registry/kokonut-ui/carousel-cards";

export default function CarouselCardsDemo() {
  return (
    <div className="w-full max-w-5xl">
      <CarouselCards defaultFavorites={["dolomites"]} />
    </div>
  );
}
