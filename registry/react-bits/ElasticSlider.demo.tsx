import { Volume2Icon, VolumeXIcon } from "lucide-react";

import ElasticSlider from "@/registry/react-bits/ElasticSlider";

export default function Demo() {
  return (
    <div className="flex min-h-[420px] w-full items-center justify-center px-6">
      <div className="flex w-full max-w-sm flex-col items-center gap-2 rounded-xl border border-border bg-card px-6 pt-6 pb-10 shadow-sm">
        <p className="font-medium text-foreground text-sm">Volume</p>
        <p className="mb-4 text-muted-foreground text-xs">
          Pull past either end to feel the stretch.
        </p>
        <ElasticSlider
          className="w-72"
          defaultValue={60}
          leftIcon={<VolumeXIcon className="size-5 text-muted-foreground" />}
          maxValue={100}
          rightIcon={<Volume2Icon className="size-5 text-muted-foreground" />}
          startingValue={0}
        />
      </div>
    </div>
  );
}
