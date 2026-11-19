import { Avatar, AvatarFallback, AvatarImage } from "@/registry/origin-ui/avatar";

const people = [
  { name: "Kelly King", img: 47 },
  { name: "Martin Diaz", img: 12 },
  { name: "Sofia Chen", img: 32 },
  { name: "Alex Moore", img: 68 },
];

export default function Demo() {
  return (
    <div className="flex flex-col items-center gap-10">
      <div className="flex items-center gap-4">
        {people.map((p) => (
          <Avatar key={p.name} className="size-20">
            <AvatarImage alt={p.name} src={`https://i.pravatar.cc/160?img=${p.img}`} />
            <AvatarFallback>{p.name.split(" ").map((s) => s[0]).join("")}</AvatarFallback>
          </Avatar>
        ))}
        <Avatar className="size-20">
          <AvatarFallback className="text-lg">JL</AvatarFallback>
        </Avatar>
        <Avatar className="size-20 rounded-lg">
          <AvatarImage alt="Nina Park" src="https://i.pravatar.cc/160?img=5" />
          <AvatarFallback>NP</AvatarFallback>
        </Avatar>
      </div>
      <div className="-space-x-3 flex">
        {[47, 12, 32, 68, 5].map((i) => (
          <Avatar key={i} className="size-14 ring-2 ring-background">
            <AvatarImage alt="" src={`https://i.pravatar.cc/120?img=${i}`} />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        ))}
        <Avatar className="size-14 ring-2 ring-background">
          <AvatarFallback className="text-sm">+8</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
}
