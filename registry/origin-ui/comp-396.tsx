import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

export default function Component() {
  return (
    <div className="relative">
      <Avatar className="rounded-md">
        <AvatarImage alt="Kelly King" src="https://i.pravatar.cc/160?img=47" />
        <AvatarFallback>KK</AvatarFallback>
      </Avatar>
      <span className="-end-1 -top-1 absolute size-3 rounded-full border-2 border-background bg-emerald-500">
        <span className="sr-only">Online</span>
      </span>
    </div>
  );
}
