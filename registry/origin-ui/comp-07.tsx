import { useId } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Component() {
  const id = useId();
  return (
    <div className="*:not-first:mt-2">
      <Label htmlFor={id}>Input with gray background</Label>
      <Input
        className="border-transparent bg-muted shadow-none"
        id={id}
        placeholder="Email"
        type="email"
      />
    </div>
  );
}
