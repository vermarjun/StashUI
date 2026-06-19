"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/origin-ui/tabs";

export default function Demo() {
  return (
    <Tabs defaultValue="overview" className="w-full max-w-md">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="analytics">Analytics</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
      <TabsContent value="overview">
        <p className="p-4 text-center text-muted-foreground text-xs">
          Overview panel — key metrics at a glance.
        </p>
      </TabsContent>
      <TabsContent value="analytics">
        <p className="p-4 text-center text-muted-foreground text-xs">
          Analytics panel — charts and trends.
        </p>
      </TabsContent>
      <TabsContent value="settings">
        <p className="p-4 text-center text-muted-foreground text-xs">
          Settings panel — configure your preferences.
        </p>
      </TabsContent>
    </Tabs>
  );
}
