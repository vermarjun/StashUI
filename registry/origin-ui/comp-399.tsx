import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export default function Component() {
  return (
    <div className="relative">
      <Avatar className="rounded-md">
        <AvatarImage alt="Kelly King" src="/origin/avatar-80-07.jpg" />
        <AvatarFallback>KK</AvatarFallback>
      </Avatar>
      <Badge className="-top-2 -translate-x-3 absolute left-full min-w-5 border-background px-1">
        6
      </Badge>
    </div>
  );
}
