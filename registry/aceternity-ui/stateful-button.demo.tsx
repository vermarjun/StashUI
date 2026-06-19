"use client";
import { Button } from "@/registry/aceternity-ui/stateful-button";

export default function StatefulButtonDemo() {
  return (
    <Button
      onClick={async () => {
        // Simulate an async action (e.g. form submit)
        await new Promise<void>((resolve) => setTimeout(resolve, 1500));
      }}
    >
      Submit
    </Button>
  );
}
