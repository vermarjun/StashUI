import { ChevronDownIcon } from "lucide-react";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export default function Component() {
  return (
    <Button className="h-auto p-0 hover:bg-transparent" variant="ghost">
      <Avatar>
        <AvatarImage alt="Profile image" src="/origin/avatar.jpg" />
        <AvatarFallback>KK</AvatarFallback>
      </Avatar>
      <ChevronDownIcon aria-hidden="true" className="opacity-60" size={16} />
    </Button>
  );
}
