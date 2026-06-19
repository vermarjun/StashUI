import FlowingMenu from "@/registry/react-bits/FlowingMenu";

const items = [
  { link: "#", text: "Home",     image: "https://picsum.photos/seed/flow1/400/200" },
  { link: "#", text: "Work",     image: "https://picsum.photos/seed/flow2/400/200" },
  { link: "#", text: "About",    image: "https://picsum.photos/seed/flow3/400/200" },
  { link: "#", text: "Contact",  image: "https://picsum.photos/seed/flow4/400/200" },
];

export default function Demo() {
  return (
    <div className="w-full h-[500px] rounded-xl overflow-hidden">
      <FlowingMenu items={items} />
    </div>
  );
}
