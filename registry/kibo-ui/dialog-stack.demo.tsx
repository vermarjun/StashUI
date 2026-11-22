"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  DialogStack,
  DialogStackBody,
  DialogStackContent,
  DialogStackDescription,
  DialogStackFooter,
  DialogStackHeader,
  DialogStackNext,
  DialogStackOverlay,
  DialogStackPrevious,
  DialogStackTitle,
  DialogStackTrigger,
} from "./dialog-stack";

const teammates = [
  { name: "Maya Chen", email: "maya@northwind.dev", img: 47 },
  { name: "Leo Park", email: "leo@northwind.dev", img: 12 },
  { name: "Priya Nair", email: "priya@northwind.dev", img: 32 },
];

const plans = [
  { name: "Starter", price: "$0", note: "Up to 3 members" },
  { name: "Team", price: "$12", note: "per member / month" },
  { name: "Business", price: "$29", note: "SSO, audit log, SLA" },
];

export default function DialogStackDemo() {
  return (
    <div className="flex min-h-[560px] w-full items-center justify-center">
      <DialogStack clickable>
        <DialogStackTrigger asChild>
          <Button variant="outline">Create workspace</Button>
        </DialogStackTrigger>
        <DialogStackOverlay />
        <DialogStackBody>
          <DialogStackContent>
            <DialogStackHeader>
              <DialogStackTitle>Name your workspace</DialogStackTitle>
              <DialogStackDescription>
                Step 1 of 3. You can change this later in settings.
              </DialogStackDescription>
            </DialogStackHeader>
            <div className="mt-4 grid gap-2">
              <Label htmlFor="ws-name">Workspace name</Label>
              <Input defaultValue="Northwind Design" id="ws-name" />
              <p className="text-muted-foreground text-xs">
                stashui.app/northwind-design
              </p>
            </div>
            <DialogStackFooter className="mt-6 justify-end">
              <DialogStackNext asChild>
                <Button>Continue</Button>
              </DialogStackNext>
            </DialogStackFooter>
          </DialogStackContent>

          <DialogStackContent>
            <DialogStackHeader>
              <DialogStackTitle>Invite your team</DialogStackTitle>
              <DialogStackDescription>
                Step 2 of 3. They will get an email invite.
              </DialogStackDescription>
            </DialogStackHeader>
            <ul className="mt-4 space-y-3">
              {teammates.map((t) => (
                <li className="flex items-center gap-3" key={t.email}>
                  <img
                    alt={t.name}
                    className="size-8 rounded-full"
                    src={`https://i.pravatar.cc/150?img=${t.img}`}
                  />
                  <div className="flex-1 text-sm">
                    <p className="font-medium">{t.name}</p>
                    <p className="text-muted-foreground text-xs">{t.email}</p>
                  </div>
                  <span className="text-muted-foreground text-xs">Editor</span>
                </li>
              ))}
            </ul>
            <DialogStackFooter className="mt-6 justify-between">
              <DialogStackPrevious asChild>
                <Button variant="ghost">Back</Button>
              </DialogStackPrevious>
              <DialogStackNext asChild>
                <Button>Send invites</Button>
              </DialogStackNext>
            </DialogStackFooter>
          </DialogStackContent>

          <DialogStackContent>
            <DialogStackHeader>
              <DialogStackTitle>Choose a plan</DialogStackTitle>
              <DialogStackDescription>
                Step 3 of 3. 14-day free trial on paid plans.
              </DialogStackDescription>
            </DialogStackHeader>
            <div className="mt-4 grid grid-cols-3 gap-2">
              {plans.map((p, i) => (
                <div
                  className={
                    i === 1
                      ? "rounded-lg border border-foreground p-3"
                      : "rounded-lg border p-3"
                  }
                  key={p.name}
                >
                  <p className="font-medium text-sm">{p.name}</p>
                  <p className="mt-1 font-semibold text-xl">{p.price}</p>
                  <p className="text-muted-foreground text-xs">{p.note}</p>
                </div>
              ))}
            </div>
            <DialogStackFooter className="mt-6 justify-between">
              <DialogStackPrevious asChild>
                <Button variant="ghost">Back</Button>
              </DialogStackPrevious>
              <Button>Start trial</Button>
            </DialogStackFooter>
          </DialogStackContent>
        </DialogStackBody>
      </DialogStack>
    </div>
  );
}
