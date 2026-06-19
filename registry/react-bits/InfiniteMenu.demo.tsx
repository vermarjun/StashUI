import InfiniteMenu from "@/registry/react-bits/InfiniteMenu";

const items = [
  { image: "https://picsum.photos/seed/im1/400/400", link: "#", title: "Explore",  description: "Discover more" },
  { image: "https://picsum.photos/seed/im2/400/400", link: "#", title: "Design",   description: "Craft interfaces" },
  { image: "https://picsum.photos/seed/im3/400/400", link: "#", title: "Build",    description: "Ship fast" },
  { image: "https://picsum.photos/seed/im4/400/400", link: "#", title: "Launch",   description: "Go live" },
  { image: "https://picsum.photos/seed/im5/400/400", link: "#", title: "Iterate",  description: "Keep improving" },
  { image: "https://picsum.photos/seed/im6/400/400", link: "#", title: "Scale",    description: "Grow further" },
];

export default function Demo() {
  return (
    <div className="relative h-[560px] w-full overflow-hidden rounded-xl bg-[#120F17]">
      <InfiniteMenu items={items} />
    </div>
  );
}
