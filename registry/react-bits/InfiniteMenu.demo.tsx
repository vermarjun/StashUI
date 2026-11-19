import InfiniteMenu from "@/registry/react-bits/InfiniteMenu";

const items = [
  { image: "https://images.unsplash.com/photo-1683223585116-23e136669e80?w=400&h=400&fit=crop&auto=format&q=80", link: "#", title: "Explore",  description: "Discover more" },
  { image: "https://images.unsplash.com/photo-1717893777838-4e222311630b?w=400&h=400&fit=crop&auto=format&q=80", link: "#", title: "Design",   description: "Craft interfaces" },
  { image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=400&fit=crop&auto=format&q=80", link: "#", title: "Build",    description: "Ship fast" },
  { image: "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=400&h=400&fit=crop&auto=format&q=80", link: "#", title: "Launch",   description: "Go live" },
  { image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=400&fit=crop&auto=format&q=80", link: "#", title: "Iterate",  description: "Keep improving" },
  { image: "https://images.unsplash.com/photo-1718603630685-d2605d5190e8?w=400&h=400&fit=crop&auto=format&q=80", link: "#", title: "Scale",    description: "Grow further" },
];

export default function Demo() {
  return (
    <div className="relative h-[560px] w-full overflow-hidden rounded-xl bg-[#120F17]">
      <InfiniteMenu items={items} />
    </div>
  );
}
