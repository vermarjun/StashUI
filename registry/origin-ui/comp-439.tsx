import { Badge } from "@/components/ui/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

export default function Component() {
  return (
    <Tabs className="w-80" defaultValue="tab-1">
      <TabsList className="mx-auto flex w-full max-w-xs bg-transparent group-data-horizontal/tabs:h-auto">
        <TabsTrigger
          className="group h-auto flex-1 flex-col p-3 text-xs data-[state=active]:bg-muted data-[state=active]:shadow-none"
          value="tab-1"
        >
          <Badge className="mb-1.5 min-w-5 px-1 transition-opacity group-data-[state=inactive]:opacity-50">
            3
          </Badge>
          Overview
        </TabsTrigger>
        <TabsTrigger
          className="group h-auto flex-1 flex-col p-3 text-xs data-[state=active]:bg-muted data-[state=active]:shadow-none"
          value="tab-2"
        >
          <Badge className="mb-1.5 min-w-5 px-1 transition-opacity group-data-[state=inactive]:opacity-50">
            0
          </Badge>
          Projects
        </TabsTrigger>
        <TabsTrigger
          className="group h-auto flex-1 flex-col p-3 text-xs data-[state=active]:bg-muted data-[state=active]:shadow-none"
          value="tab-3"
        >
          <Badge className="mb-1.5 min-w-5 px-1 transition-opacity group-data-[state=inactive]:opacity-50">
            7
          </Badge>
          Packages
        </TabsTrigger>
      </TabsList>
      <TabsContent value="tab-1">
        <p className="p-4 text-center text-muted-foreground text-xs">
          3 updates since your last visit.
        </p>
      </TabsContent>
      <TabsContent value="tab-2">
        <p className="p-4 text-center text-muted-foreground text-xs">
          No projects yet. Create one to get started.
        </p>
      </TabsContent>
      <TabsContent value="tab-3">
        <p className="p-4 text-center text-muted-foreground text-xs">
          7 packages published this month.
        </p>
      </TabsContent>
    </Tabs>
  );
}
