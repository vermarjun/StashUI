import { BoxIcon, HouseIcon, PanelsTopLeftIcon } from "lucide-react";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

export default function Component() {
  return (
    <Tabs defaultValue="tab-1">
      <ScrollArea>
        <TabsList className="relative mb-3 h-auto w-full gap-0.5 bg-transparent p-0 before:absolute before:inset-x-0 before:bottom-0 before:h-px before:bg-border">
          <TabsTrigger
            className="overflow-hidden rounded-b-none border-x border-t bg-muted py-2 data-[state=active]:z-10 data-[state=active]:shadow-none"
            value="tab-1"
          >
            <HouseIcon
              aria-hidden="true"
              className="-ms-0.5 me-1.5 opacity-60"
              size={16}
            />
            Overview
          </TabsTrigger>
          <TabsTrigger
            className="overflow-hidden rounded-b-none border-x border-t bg-muted py-2 data-[state=active]:z-10 data-[state=active]:shadow-none"
            value="tab-2"
          >
            <PanelsTopLeftIcon
              aria-hidden="true"
              className="-ms-0.5 me-1.5 opacity-60"
              size={16}
            />
            Projects
          </TabsTrigger>
          <TabsTrigger
            className="overflow-hidden rounded-b-none border-x border-t bg-muted py-2 data-[state=active]:z-10 data-[state=active]:shadow-none"
            value="tab-3"
          >
            <BoxIcon
              aria-hidden="true"
              className="-ms-0.5 me-1.5 opacity-60"
              size={16}
            />
            Packages
          </TabsTrigger>
        </TabsList>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
      <TabsContent value="tab-1">
        <div className="space-y-1 p-4 pt-1">
          <p className="font-medium text-sm">Northwind Web</p>
          <p className="text-muted-foreground text-sm">
            Last deployed 12 minutes ago from <span className="text-foreground">main</span>. All 48 checks passing.
          </p>
        </div>
      </TabsContent>
      <TabsContent value="tab-2">
        <ul className="space-y-1 p-4 pt-1 text-sm">
          <li className="flex justify-between"><span>Checkout redesign</span><span className="text-muted-foreground">In review</span></li>
          <li className="flex justify-between"><span>Mobile onboarding</span><span className="text-muted-foreground">In progress</span></li>
          <li className="flex justify-between"><span>Billing v2</span><span className="text-muted-foreground">Planned</span></li>
        </ul>
      </TabsContent>
      <TabsContent value="tab-3">
        <ul className="space-y-1 p-4 pt-1 font-mono text-sm">
          <li className="flex justify-between"><span>@northwind/ui</span><span className="text-muted-foreground">v2.4.1</span></li>
          <li className="flex justify-between"><span>@northwind/api-client</span><span className="text-muted-foreground">v1.9.0</span></li>
        </ul>
      </TabsContent>
    </Tabs>
  );
}
