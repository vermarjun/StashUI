import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

export default function Component() {
  return (
    <Avatar>
      <AvatarImage alt="Kelly King" src="https://i.pravatar.cc/160?img=47" />
      <AvatarFallback>KK</AvatarFallback>
    </Avatar>
  );
}
