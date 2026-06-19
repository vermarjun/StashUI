"use client";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/registry/origin-ui/navigation-menu";

export default function Demo() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Products</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-48 gap-1 p-1">
              <li>
                <NavigationMenuLink href="#">
                  <span className="font-medium">Overview</span>
                  <span className="text-muted-foreground">All products at a glance</span>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink href="#">
                  <span className="font-medium">Analytics</span>
                  <span className="text-muted-foreground">Insights and reports</span>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink href="#">
                  <span className="font-medium">Integrations</span>
                  <span className="text-muted-foreground">Connect your tools</span>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Docs</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-48 gap-1 p-1">
              <li>
                <NavigationMenuLink href="#">
                  <span className="font-medium">Getting Started</span>
                  <span className="text-muted-foreground">Quick setup guide</span>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink href="#">
                  <span className="font-medium">API Reference</span>
                  <span className="text-muted-foreground">Full API docs</span>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink href="#">Pricing</NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
