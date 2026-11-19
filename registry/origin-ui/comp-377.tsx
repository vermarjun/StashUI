import {
  BoltIcon,
  BookOpenIcon,
  ChevronDownIcon,
  CreditCardIcon,
  Layers2Icon,
  LogOutIcon,
  UserIcon,
} from "lucide-react";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Component() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button aria-label="Account menu" className="h-auto p-0 hover:bg-transparent" variant="ghost">
          <Avatar>
            <AvatarImage alt="Profile image" src="https://i.pravatar.cc/80?img=12" />
            <AvatarFallback>KK</AvatarFallback>
          </Avatar>
          <ChevronDownIcon
            aria-hidden="true"
            className="opacity-60"
            size={16}
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-60">
        <DropdownMenuLabel className="flex min-w-0 flex-col">
          <span className="truncate font-medium text-foreground text-sm">
            Keith Kennedy
          </span>
          <span className="truncate font-normal text-muted-foreground text-xs">
            k.kennedy@coss.com
          </span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <UserIcon aria-hidden="true" className="opacity-60" size={16} />
            <span>Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <CreditCardIcon aria-hidden="true" className="opacity-60" size={16} />
            <span>Billing</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <BoltIcon aria-hidden="true" className="opacity-60" size={16} />
            <span>Settings</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Layers2Icon aria-hidden="true" className="opacity-60" size={16} />
            <span>Team</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <BookOpenIcon aria-hidden="true" className="opacity-60" size={16} />
            <span>Documentation</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogOutIcon aria-hidden="true" className="opacity-60" size={16} />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
