import FlowingMenu from "@/registry/react-bits/FlowingMenu";

const items = [
  { link: "#", text: "Home",     image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=400&h=200&fit=crop&auto=format&q=80" },
  { link: "#", text: "Work",     image: "https://images.unsplash.com/photo-1532423622396-10a3f979251a?w=400&h=200&fit=crop&auto=format&q=80" },
  { link: "#", text: "About",    image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=400&h=200&fit=crop&auto=format&q=80" },
  { link: "#", text: "Contact",  image: "https://images.unsplash.com/photo-1475727946784-2890c8fdb9c8?w=400&h=200&fit=crop&auto=format&q=80" },
];

export default function Demo() {
  return (
    <div className="w-full h-[500px] rounded-xl overflow-hidden">
      <FlowingMenu items={items} />
    </div>
  );
}
