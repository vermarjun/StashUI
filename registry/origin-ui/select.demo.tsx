"use client";

import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/registry/origin-ui/select";

export default function Demo() {
  return (
    <div className="flex min-h-[480px] w-full items-center justify-center px-6">
      <div className="flex w-full max-w-2xl gap-8">
        <div className="w-full max-w-xs space-y-4 rounded-xl border border-border bg-card p-6 shadow-sm">
          <p className="font-medium text-foreground text-sm">New project</p>
          <div className="space-y-2">
            <Label htmlFor="framework">Framework</Label>
            <Select defaultValue="next">
              <SelectTrigger className="w-full" id="framework">
                <SelectValue placeholder="Select a framework" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="next">Next.js</SelectItem>
                <SelectItem value="remix">Remix</SelectItem>
                <SelectItem value="astro">Astro</SelectItem>
                <SelectItem value="vite">Vite</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="region">Region</Label>
            <Select defaultValue="fra">
              <SelectTrigger className="w-full" id="region">
                <SelectValue placeholder="Select a region" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="iad">Washington, D.C.</SelectItem>
                <SelectItem value="fra">Frankfurt</SelectItem>
                <SelectItem value="sin">Singapore</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="w-full max-w-xs space-y-2 pt-6">
          <Label htmlFor="timezone">Timezone</Label>
          <Select defaultValue="cet">
            <SelectTrigger className="w-full" id="timezone">
              <SelectValue placeholder="Select a timezone" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Europe</SelectLabel>
                <SelectItem value="gmt">Greenwich Mean Time</SelectItem>
                <SelectItem value="cet">Central European Time</SelectItem>
                <SelectItem value="eet">Eastern European Time</SelectItem>
              </SelectGroup>
              <SelectSeparator />
              <SelectGroup>
                <SelectLabel>Asia</SelectLabel>
                <SelectItem value="ist">India Standard Time</SelectItem>
                <SelectItem value="jst">Japan Standard Time</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
