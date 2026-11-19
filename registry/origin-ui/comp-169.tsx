import { CheckIcon, MinusIcon } from "lucide-react";
import { useId } from "react";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

// Tiny UI mockups (sidebar + header + content lines), inlined so the
// component needs no image assets.
function mockUi(bg: string, panel: string, line: string, accent: string) {
  return `<rect width="88" height="70" fill="${bg}"/><rect x="0" y="0" width="22" height="70" fill="${panel}"/><rect x="5" y="8" width="12" height="3" rx="1.5" fill="${accent}"/><rect x="5" y="16" width="12" height="2" rx="1" fill="${line}"/><rect x="5" y="22" width="9" height="2" rx="1" fill="${line}"/><rect x="5" y="28" width="11" height="2" rx="1" fill="${line}"/><rect x="28" y="8" width="34" height="4" rx="2" fill="${line}"/><rect x="28" y="18" width="54" height="18" rx="3" fill="${panel}"/><rect x="28" y="41" width="25" height="22" rx="3" fill="${panel}"/><rect x="57" y="41" width="25" height="22" rx="3" fill="${panel}"/>`;
}
const light = mockUi("#ffffff", "#f1f1f3", "#d4d4d8", "#18181b");
const dark = mockUi("#09090b", "#1c1c20", "#3f3f46", "#fafafa");
const svg = (body: string) =>
  `data:image/svg+xml;utf8,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 88 70">${body}</svg>`,
  )}`;

const items = [
  { image: svg(light), label: "Light", value: "1" },
  { image: svg(dark), label: "Dark", value: "2" },
  {
    image: svg(
      `<defs><clipPath id="h"><polygon points="0,0 88,0 0,70"/></clipPath><clipPath id="d"><polygon points="88,0 88,70 0,70"/></clipPath></defs><g clip-path="url(#h)">${light}</g><g clip-path="url(#d)">${dark}</g>`,
    ),
    label: "System",
    value: "3",
  },
];

export default function Component() {
  const id = useId();
  return (
    <fieldset className="space-y-4">
      <legend className="font-medium text-foreground text-sm leading-none">
        Choose a theme
      </legend>
      <RadioGroup className="flex gap-3" defaultValue="1">
        {items.map((item) => (
          <label key={`${id}-${item.value}`}>
            <RadioGroupItem
              className="peer sr-only after:absolute after:inset-0"
              id={`${id}-${item.value}`}
              value={item.value}
            />
            <img
              alt={item.label}
              className="relative cursor-pointer overflow-hidden rounded-md border border-input shadow-xs outline-none transition-[color,box-shadow] peer-focus-visible:ring-[3px] peer-focus-visible:ring-ring/50 peer-data-disabled:cursor-not-allowed peer-data-[state=checked]:border-ring peer-data-[state=checked]:bg-accent peer-data-disabled:opacity-50"
              height={70}
              src={item.image}
              width={88}
            />
            <span className="group mt-2 flex items-center gap-1 peer-data-[state=unchecked]:text-muted-foreground/70">
              <CheckIcon
                aria-hidden="true"
                className="group-peer-data-[state=unchecked]:hidden"
                size={16}
              />
              <MinusIcon
                aria-hidden="true"
                className="group-peer-data-[state=checked]:hidden"
                size={16}
              />
              <span className="font-medium text-xs">{item.label}</span>
            </span>
          </label>
        ))}
      </RadioGroup>
    </fieldset>
  );
}
