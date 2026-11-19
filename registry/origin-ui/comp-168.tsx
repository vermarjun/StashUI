import { useId } from "react";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const scores = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

export default function Component() {
  const id = useId();
  return (
    <div className="w-full max-w-md">
      <fieldset className="space-y-4">
        <legend className="font-medium text-foreground text-sm leading-none">
          How likely are you to recommend us?
        </legend>
        <RadioGroup className="-space-x-px flex gap-0 rounded-md shadow-xs">
          {scores.map((value) => (
            <label
              className="relative flex h-9 min-w-0 flex-1 cursor-pointer items-center justify-center border border-input text-center font-medium text-sm tabular-nums outline-none transition-[color,background-color,box-shadow] first:rounded-s-md last:rounded-e-md hover:bg-accent has-data-[state=checked]:z-10 has-data-disabled:cursor-not-allowed has-data-[state=checked]:border-primary has-data-[state=checked]:bg-primary has-data-[state=checked]:text-primary-foreground has-focus-visible:border-ring has-data-disabled:opacity-50 has-focus-visible:ring-[3px] has-focus-visible:ring-ring/50"
              key={value}
            >
              <RadioGroupItem
                className="sr-only absolute! after:absolute after:inset-0"
                id={`${id}-${value}`}
                value={value}
              />
              {value}
            </label>
          ))}
        </RadioGroup>
      </fieldset>
      <div className="mt-2 flex justify-between gap-4 font-medium text-muted-foreground text-xs">
        <p>
          <span className="text-base">😡</span> Not likely
        </p>
        <p>
          Very likely <span className="text-base">😍</span>
        </p>
      </div>
    </div>
  );
}
