"use client";

import { useToast } from "@/registry/origin-ui/use-toast";
import { Button } from "@/components/ui/button";
import { ToastAction } from "@/components/ui/toast";

export default function Component() {
  const { toast } = useToast();

  return (
    <Button
      onClick={() => {
        toast({
          action: <ToastAction altText="Try again">Try again</ToastAction>,
          description: "There was a problem with your request.",
          title: "We couldn't complete your request!",
        });
      }}
      variant="outline"
    >
      Show toast
    </Button>
  );
}
