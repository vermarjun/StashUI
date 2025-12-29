import { useId } from "react";

import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function Component() {
  const id = useId();
  return (
    <div className="*:not-first:mt-2">
      <Label htmlFor={id}>Read-only textarea</Label>
      <Textarea
        className="read-only:bg-muted"
        defaultValue="This is a read-only textarea"
        id={id}
        placeholder="Leave a comment"
        readOnly
      />
    </div>
  );
}
